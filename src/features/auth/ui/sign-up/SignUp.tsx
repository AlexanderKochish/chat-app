import { useForm } from "react-hook-form";
import { ChatLogo } from "../../../../shared/assets/icons";
import s from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../../shared/ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaType } from "../../model/zod/auth.schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { signUp } from "../../../../shared/api";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpSchemaType) => onSubmit(data),
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const response = await signUp(data);

      if (response?.status === 201) {
        toast.success("Registration is Success");
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

  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className={s.signUp}>
      <div className={s.signUpWrapper}>
        <div className={s.top}>
          <ChatLogo height="35" width="35" />
          <h1>Chatter</h1>
        </div>
        <form
          className={s.form}
          onSubmit={handleSubmit((data) => mutate(data))}
        >
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
