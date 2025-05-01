import { Link, useNavigate } from "react-router-dom";
import s from "./SignIn.module.css";
import { ChatLogo } from "../../../../shared/assets/icons";
import Input from "../../../../shared/ui/Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchemaType } from "../../model/zod/auth.schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signIn } from "../../../../shared/api";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm<SignInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(signInSchema),
  });
  const { mutate } = useMutation({
    mutationFn: (data: SignInSchemaType) => onSubmit(data),
  });
  const onSubmit = async (data: SignInSchemaType) => {
    try {
      const response = await signIn(data);
      if (response?.status === 201) {
        toast.success("Logged is successful");
      }
      reset();
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }
    }
  };
  return (
    <section className={s.signUp}>
      <div className={s.signUpWrapper}>
        <div className={s.top}>
          <ChatLogo width="35" height="35" />
          <h1>Chatter</h1>
        </div>
        <form
          className={s.form}
          onSubmit={handleSubmit((data) => mutate(data))}
        >
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
