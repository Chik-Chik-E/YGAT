import styled from "styled-components";
import React, {
  PropsWithChildren,
  useCallback,
  useState,
  useEffect,
} from "react";
import Pin2 from "../../svg/pin2.svg";
import MyLocationModal from "../../components/HomePage/MyLocationModal";

interface TitlelType {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModalBox: boolean;
  setIsOpenModalBox: React.Dispatch<React.SetStateAction<boolean>>;
  selectAddress: string | null;
  setSelectAddress: React.Dispatch<React.SetStateAction<string | null>>;
  selectLocation: { latitude: number; longitude: number } | string;
  setSelectLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
  textBoolean: boolean;
}

const Title = ({
  isOpenModal,
  setIsOpenModal,
  selectAddress,
  setSelectAddress,
  isOpenModalBox,
  setIsOpenModalBox,
  selectLocation,
  setSelectLocation,
  textBoolean,
  children,
}: PropsWithChildren<TitlelType>) => {
  function recentAddressStore(): string[] {
    const recentAddressJSON = localStorage.getItem("RecentAddressSearch");
    if (recentAddressJSON === null) return [];
    return JSON.parse(recentAddressJSON);
  }
  const recentAddressData: string[] = recentAddressStore();

  const [searchRoadAddress, setSearchRoadAddress] = useState<string>("");
  const [searchJibunAddress, setSearchJibunAddress] = useState<string>("");
  const [componentCheck, setComponentCheck] = useState<boolean>(false);
  const [searchLocation, setsearchLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  function searchAddressToCoordinate(address: string, setAddress: React.Dispatch<React.SetStateAction<string | {
    latitude: number;
    longitude: number;
}>>) {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }
        if (response.v2.meta.totalCount === 0) {
          return alert("올바른 주소를 입력해주세요.");
        }
        const item = response.v2.addresses[0];
        if (item.roadAddress) {
          setSearchRoadAddress(item.roadAddress);
        }
        if (item.jibunAddress) {
          setSearchJibunAddress(item.jibunAddress);
        }

        console.log(item.y, item.x)
        setAddress({
          latitude: Number(item.y),
          longitude: Number(item.x),
        });
      }
    );
  }

  const defaultLocation = { latitude: 36.1078224, longitude: 128.4177517 };

  const onClickToggleModal = useCallback(() => {
    if (isOpenModal) {
      setIsOpenModalBox(!isOpenModalBox);
      setTimeout(() => setIsOpenModal(!isOpenModal), 500);
    } else {
      setIsOpenModalBox(!isOpenModalBox);
      setIsOpenModal(!isOpenModal);
    }
  }, [isOpenModal]);

  const findAddress = (
    latlng: naver.maps.LatLng,
    map: naver.maps.Map,
    select: React.Dispatch<React.SetStateAction<string>>
  ) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      function (
        status: naver.maps.Service.Status,
        response: naver.maps.Service.ReverseGeocodeResponse
      ) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something went wrong!");
        }
        const address = response.v2.address.roadAddress
          ? response.v2.address.roadAddress
          : response.v2.address.jibunAddress;
        select(address);
      }
    );
  };

  useEffect(() => {
    if (recentAddressData.length !== 0) {
      searchAddressToCoordinate(recentAddressData[0], setSelectLocation);
      setSelectAddress(recentAddressData[0]);
    }
  }, []);

  return (
    <>
      {isOpenModal && (
        <MyLocationModal
          defaultLocation={defaultLocation}
          onClickToggleModal={onClickToggleModal}
          isOpenModal={isOpenModalBox}
          selectAddress={selectAddress}
          setSelectAddress={setSelectAddress}
          findAddress={findAddress}
          selectLocation={selectLocation}
          setSelectLocation={setSelectLocation}
          recentAddressData={recentAddressData}
          searchRoadAddress={searchRoadAddress}
          searchJibunAddress={searchJibunAddress}
          componentCheck={componentCheck}
          setComponentCheck={setComponentCheck}
          searchLocation={searchLocation}
          setsearchLocation={setsearchLocation}
          searchAddressToCoordinate={searchAddressToCoordinate}
        />
      )}
      {textBoolean && (
        <TitleBox onClick={onClickToggleModal}>
          <img src={Pin2} />
          <div>{selectAddress ? selectAddress : "주소를 설정해주세요."}</div>
        </TitleBox>
      )}
    </>
  );
};

export default Title;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  width: 80%;
  margin-inline: auto;
  > img {
    width: 24px;
    height: 24px;
  }
  > div {
    font-size: var(--body-text);
    margin: auto 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
