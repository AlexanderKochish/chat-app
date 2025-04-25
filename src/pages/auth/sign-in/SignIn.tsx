import { Link } from "react-router-dom";
import s from "./SignIn.module.css";
import { ChatLogo } from "../../../assets/icons";
import Input from "../../../components/ui/Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  SignInSchemaType,
} from "../../../lib/schemas/auth.schema";

const SignIn = () => {
  const { handleSubmit, control } = useForm<SignInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = (data: SignInSchemaType) => console.log(data);
  return (
    <section className={s.signUp}>
      <div className={s.signUpWrapper}>
        <div className={s.top}>
          <ChatLogo width="35" height="35" />
          <h1>Chatter</h1>
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Input control={control} name="email" />
          <Input control={control} name="password" icon />
          <button className={s.btn} type="submit">
            Sign In
          </button>
        </form>
        <p>
          You don't have an account yet? <Link to={"/sign-up"}>Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
