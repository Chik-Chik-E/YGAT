import React, { useState, useEffect, useCallback } from "react";

interface TbusinessDayHour {
  open: string;
  close: string;
  reservationInterval: string;
  storeHoliday: boolean;
}

interface TbusinessDay {
  [key: string]: TbusinessDayHour;
  monday: TbusinessDayHour;
  tuesday: TbusinessDayHour;
  wendesday: TbusinessDayHour;
  thursday: TbusinessDayHour;
  friday: TbusinessDayHour;
  saturday: TbusinessDayHour;
  sunday: TbusinessDayHour;
}

export interface TinitialValues {
  [key: string]: string | undefined | boolean | File | TbusinessDay;
  userId?: string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  nickname?: string;
  passwordcheck?: string;
  brcImage?: File;
  businessHour?: TbusinessDay;
  agree?: boolean;
}

export type TuseFormParams = {
  initialValues: TinitialValues;
  formPlaceHolder: { [key: string]: string };
  formMaxLength: { [key: string]: number };
  validate(values: object): object;
  onSubmit(values: object): void;
};

export type TuseFormReturn = {
  values: TinitialValues;
  errors: {
    [key: string]: string;
  };
  touched: {
    [key: string]: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBusinessHour: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldProps: (name: string) => {
    name: string;
    // value: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

function useForm({
  initialValues,
  formPlaceHolder,
  formMaxLength,
  validate,
  onSubmit,
}: TuseFormParams) {
  const [values, setValues] = useState<TinitialValues>(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setValues({
        ...values,
        [e.target.name]: e.target.checked,
      });
      return;
    }
    if (e.target.type === "file" && e.target.files) {
      setValues({
        ...values,
        [e.target.name]: e.target.files[0],
      });
      return;
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessHour = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBus = values.businessHour;

    const eInfo = e.target.id.split("-");
    console.log(eInfo);

    if (eInfo[0] === "monday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.monday.open =
          e.currentTarget.value + newBus.monday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.monday.open =
          newBus.monday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.monday.close =
          newBus.monday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.monday.close =
          newBus.monday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.monday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.monday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "tuseday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.tuseday.open =
          e.currentTarget.value + newBus.tuseday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.tuseday.open =
          newBus.tuseday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.tuseday.close =
          newBus.tuseday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.tuseday.close =
          newBus.tuseday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.tuseday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.tuseday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "wendsday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.wendsday.open =
          e.currentTarget.value + newBus.wendsday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.wendsday.open =
          newBus.wendsday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.wendsday.close =
          newBus.wendsday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.wendsday.close =
          newBus.wendsday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.wendsday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.wendsday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "thursday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.thursday.open =
          e.currentTarget.value + newBus.thursday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.thursday.open =
          newBus.thursday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.thursday.close =
          newBus.thursday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.thursday.close =
          newBus.thursday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.thursday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.thursday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "friday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.friday.open =
          e.currentTarget.value + newBus.friday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.friday.open =
          newBus.friday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.friday.close =
          newBus.friday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.friday.close =
          newBus.friday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.friday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.friday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "saturday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.saturday.open =
          e.currentTarget.value + newBus.saturday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.saturday.open =
          newBus.saturday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.saturday.close =
          newBus.saturday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.saturday.close =
          newBus.saturday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.saturday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.saturday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "sunday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.sunday.open =
          e.currentTarget.value + newBus.sunday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.sunday.open =
          newBus.sunday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.sunday.close =
          newBus.sunday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.sunday.close =
          newBus.sunday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.sunday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.sunday.storeHoliday = e.currentTarget.checked;
      }
    }

    console.log(newBus);
    setValues({
      ...values,
      businessHour: newBus,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 필드에 방문했다고 표시한다
    setTouched(
      Object.keys(values).reduce(
        (new_touched: { [key: string]: boolean }, field) => {
          new_touched[field] = true;
          return new_touched;
        },
        {}
      )
    );

    const new_errors = validate(values);
    setErrors(new_errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    // useForm의 폼 제출을 완료하고 사용하는 쪽으로 알린다
    onSubmit(values);
  };

  // 입력값에 따라 검증 함수를 실행하는 함수를 정의한다
  const runValidator = useCallback(() => validate(values), [values]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  // 전화번호 자동 하이픈 생성
  useEffect(() => {
    if (!values.phoneNumber) return;
    if (typeof values.phoneNumber === "string") {
      const pNumber = values.phoneNumber;
      if (pNumber.length === 11) {
        setValues((prev) => {
          return {
            ...prev,
            phoneNumber: pNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          };
        });
      } else if (pNumber.length === 13) {
        setValues((prev) => {
          return {
            ...prev,
            phoneNumber: pNumber
              //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
              .replace(/-/g, "")
              .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          };
        });
      }
    }
  }, [values.phoneNumber]);

  // 필드 속성으로 사용할 값을 조회한다
  const getFieldProps = (name: string) => {
    // password값이 DOM에 보여서...제외, HTMLInput에서 File이 values로 존재할 수 없어서 제외
    const value = name === "password" || "brcImage" ? undefined : values[name];

    const maxLength = formMaxLength[name];
    const placeholder = formPlaceHolder[name];

    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      maxLength,
      placeholder,
      onBlur,
      onChange,
    };
  };

  // 훅을 사용하는 쪽에 제공하는 api다
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBusinessHour,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
}

export default useForm;
