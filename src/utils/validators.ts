import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const signupValidation = Yup.object({
  username: Yup.string()
    .required("You have to add username")
    .test("len", "Must be 3 characters or more", (val) =>
      val ? val.length >= 3 : false
    ),
  email: Yup.string()
    .email("Add a valid email address")
    .required("Add email  please"),
  password: Yup.string()
    .password()
    .minSymbols(0)
    .required("Add your password please"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password please"),
});

export const signinValidation = Yup.object({
  email: Yup.string()
    .email("Add a valid email address")
    .required("Add email  please"),
  password: Yup.string().required("Add password plz"),
});
