import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <section className="login absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 py-6 px-5 border rounded-md border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none">
      <h1 className="mb-5">Entrar</h1>
      <LoginForm />
    </section>
  );
};

export default LoginPage;