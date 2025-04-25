import { useForm } from "react-hook-form";
import { ChatLogo } from "../../../assets/icons";
import s from "./SignUp.module.css";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  SignUpSchemaType,
} from "../../../lib/schemas/auth.schema";

const SignUp = () => {
  const { handleSubmit, control } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data: SignUpSchemaType) => console.log(data);
  return (
    <section className={s.signUp}>
      <div className={s.signUpWrapper}>
        <div className={s.top}>
          <ChatLogo />
          <h1>Chatter</h1>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Input control={control} name="name" />
          <Input control={control} name="email" />
          <Input control={control} name="password" icon />
          <Input control={control} name="confirmPassword" icon />
          <button className={s.btn} type="submit">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to={"/sign-in"}>Sign In</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
