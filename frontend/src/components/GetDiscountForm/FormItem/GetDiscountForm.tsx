import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { sendPostRequest } from "../../../utils/sendPostRequest";
import { showToastSuccess } from "../../CommonComponents/Toasts/toasts";

import styles from "./GetDiscountForm.module.css";

type TFormValues = {
  phone: string;
};

const GetDiscountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>({ mode: "onBlur" });
  const { t } = useTranslation();

  const submit: SubmitHandler<TFormValues> = (data) => {
    console.log(data);
    const targetUrl = "/discount/get";
    sendPostRequest(targetUrl, data);
    showToastSuccess(t("mainPage__GetDiscountFormShowToastSuccessText"));
    reset();
  };

  const phoneRegExp = /^[0-9+()#.\s/ext-]+$/;
  const phoneRegister = register("phone", {
    required: t("mainPage__GetDiscountFormPhoneIsRequiredText"),
    pattern: {
      value: phoneRegExp,
      message: t("mainPage__GetDiscountFormPleaseEnterValidPhoneText"),
    },
  });

  return (
    <>
      <form id={styles.getDiscount__form} onSubmit={handleSubmit(submit)}>
        <div id={styles.getDiscount__formInputWrapper}>
          <input
            id={styles.getDiscount__formInput}
            type="tel"
            placeholder="+49"
            {...phoneRegister}
          />
        </div>
        {errors.phone && (
          <div id={styles.getDiscount__customerPhoneInputError}>
            {errors.phone?.message}
          </div>
        )}
        <button id={styles.getDiscount__formSubmit}>
          {t("mainPage__GetDiscountFormSubmitButtonText")}
        </button>
      </form>
    </>
  );
};

export default GetDiscountForm;
