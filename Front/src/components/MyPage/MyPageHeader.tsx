import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../utils/recoil/userAtom";

import { GrUserSettings } from "react-icons/gr";

export const UserInfoCard = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <UserInfoCardBox>
      <NameCard>
        <div>
          <span className='user-name'>{userInfo.userName}</span>
          <span className='user-id'>{userInfo.userNickname}</span>
        </div>
      </NameCard>
      <Link to='/mobile/hobby'>
        <button>취미수정</button>
      </Link>
    </UserInfoCardBox>
  );
};

export const MyPageCategory = () => {
  return (
    <MyPageCategoryBox>
      <NavLink to='my-review'>
        <li>내 리뷰</li>
      </NavLink>
      <NavLink to='my-reservation'>
        <li>예약 내역</li>
      </NavLink>
      <NavLink to='customer-service'>
        <li>고객 센터</li>
      </NavLink>
    </MyPageCategoryBox>
  );
};

const UserInfoCardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 0px 10px;
  padding: 10px;

  border-top: 2px solid var(--primary-color);
  border-left: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-radius: 10px 10px 0 0;

  img {
    width: 100px;
    height: 100px;

    object-fit: fill;
    border-radius: 100%;
    border: 2px solid var(--primary-color);
  }

  button {
    background-color: var(--primary-color);
    border-radius: 10px;
    height: 60px;
    width: 100px;
    color: white;
    font-size: var(--title-1);
  }
`;

const NameCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .user-name {
    font-size: var(--large-text);
  }

  .user-id {
    font-size: var(--title-1);
    color: var(--gray-color);
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  svg {
    margin-left: 20px;
    font-size: 30px;
  }
`;

const MyPageCategoryBox = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0px 10px;

  border-left: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);

  > a {
    width: 33.4%;
    padding: 10px;
    font-size: var(--body-text);
    text-align: center;
    border-radius: 10px 10px 0px 0px;

    transition: 0.2s all;
  }

  > a.active {
    color: white;
    background-color: var(--primary-color);
  }
`;
