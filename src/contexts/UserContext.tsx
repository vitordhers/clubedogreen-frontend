/* eslint-disable react-hooks/exhaustive-deps */
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  UpdateDate,
  getUser,
  loginApi,
  newReturnDate,
  recoveryPasswordByEmail,
  registerApi,
} from "../lib/api";
import { emailRegEx, passwordRegEx } from "../lib/regEx";
import { useGeneral } from "./GeneralContext";
import { RegisterProps } from "@/pages/register";
import BlockPage from "@/pages/components/Blockpage";
import { useTimer } from "./TimerContext";

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ip: string;
  planTime: string;
  validation: any;
  recoverPasswordToken: any;
  reviewed: any;
  plantype: string;
  nextpayment: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatchUser {}

interface SocialAccounts {
  id: number;
  user: number;
  user_id: number;
  provider: string;
  provider_account_id: string;
  created_at: string;
  updated_at: string;
}

interface ProjectProps {
  title: string;
  description: string;
  files: [string];
  tags: [string];
  adult_content: boolean;
}

interface PortfolioProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  files: string[];
  adult_content: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface ContextProps {
  user?: User;
  plan: any;
  isReady: boolean;
  // getUser: (isLogin?: boolean) => Promise<void>
  login: (email: string, password: string) => Promise<void>;
  // signup: (data: CreateUser) => Promise<void>
  logout: () => void;
  register: (data: RegisterProps) => Promise<void>;
  setGame: any;
  game: any;
  startTime: any;
  state: any;
  getRecoveryPassword: (email: string) => void;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider = ({ children }: any) => {
  const [game, setGame] = useState<any>("empty");
  const { startTimestamp, loadTime } = useTimer();
  const [token, setToken] = useState<any>(getCookie("accessToken"));
  const [plan, setPlan] = useState<any>(false);
  const countdownDate = useRef<any>(getCookie("limitHour"));
  const router = useRouter();
  const { isLoading, setIsLoading, showAlert } = useGeneral();
  const [user, setUser] = useState<any>(getCookie("user"));
  const [isReady, setIsReady] = useState(false);
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false);

  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showSignout, setShowSignout] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    deleteCookie("accessToken");
    deleteCookie("user");
    setUser(null);
    router.push("/login");
    setIsLoading(false);
  };

  async function getUserData() {
    const myUser: any = await getCookie("accessToken");
    if (myUser) {
      try {
        const response = await getUser(myUser).then((res) => res);
        setCookie("user", JSON.stringify(response));
        loadTime();
        setTimeout(() => loadFromStorage(), 1000);
        /*
			if (response.planType === 'FREE') {
			  hourChecker(response);
			  validation();
			} else {
			  if (new Date(response.nextPayment).getTime() < new Date().getTime()) {
				setPlan(true);
			  } else {
				setPlan(false);
			  }
			}
			*/
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    if (!emailRegEx.test(email)) {
      return showAlert("error", "Insira um e-mail válido!");
    }
    if (!passwordRegEx.test(password)) {
      return showAlert("error", "Insira uma senha válida!");
    }
    setIsLoading(true);
    try {
      const { token, user } = await loginApi({
        email: email,
        password: password,
      }).then((res) => res);
      setUser(JSON.stringify(user));
      setCookie("accessToken", token);
      setCookie("user", JSON.stringify(user));

      setTimeout(() => {
        // !!!!!!!!
        router.reload();
        setIsLoading(false);
      }, 1000 * 2);
    } catch (e: any) {
      setIsLoading(false);
      showAlert(
        "error",
        e?.response?.data.errors ||
          "Ocorreu um erro, confira seu email/senha e tente novamente!"
      );
    }
  };

  const register = async (data: RegisterProps): Promise<void> => {
    if (!emailRegEx.test(data.email)) {
      return showAlert("error", "Insira um e-mail válido!");
    }
    if (!passwordRegEx.test(data.password)) {
      return showAlert("error", "Insira uma senha válida!");
    }
    setIsLoading(true);
    try {
      const { token, user } = await registerApi({
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        name: data.name,
      }).then((res) => res);
      setCookie("accessToken", token);
      setCookie("user", JSON.stringify(user));
      setIsLoading(false);
      setTimeout(() => router.push("/"), 1000 * 2);
    } catch (e: any) {
      setIsLoading(false);
      showAlert(
        "error",
        e?.response?.data.errors[0] ||
          "Ocorreu um erro, tente novamente mais tarde!"
      );
    }
  };

  async function paymentValidation() {
    const thisUser: any = await getCookie("user");
    const formatted = JSON.parse(thisUser);
    if (formatted.nextPayment) {
      console.log(
        new Date(formatted.nextPayment).getTime() < new Date().getTime()
      );
      if (new Date(formatted.nextPayment).getTime() < new Date().getTime()) {
        setPlan(true);
      } else {
        setPlan(false);
      }
    }
  }

  async function updateDate(data: UpdateDate) {
    try {
      const response = await newReturnDate(data).then((res) => res);
      startTimestamp();
      getUserData();
      return response;
    } catch (error) {
      console.error(error);
      // handle error
    }
  }

  async function startTime() {
    const myUser: any = await getCookie("user");
    const format = JSON.parse(myUser);
    if (game === "empty") {
      const data: UpdateDate = {
        userId: format.id,
      };
      updateDate(data);
      startTimestamp();
    }
  }

  function addHours(date: any, hours: any) {
    date.setHours(date.getHours() + hours);
    return date;
  }

  const setNewTime = (countDown?: any) => {
    const currentTime = new Date().getTime();
    if (countDown > currentTime || countdownDate.current > currentTime) {
      const distanceToDate =
        countDown - currentTime || countdownDate.current - currentTime;

      let days: any = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours: any = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes: any = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds: any = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }
      setState({ days: days, hours: hours, minutes, seconds });
    } else {
      setIsTimerStart(false);
      // getUserData();
      setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      setIsLoading(true);
      const token = getCookie("accessToken");
      if (token) {
        getUserData();
        // api.defaults.headers.common.Authorization = `Bearer ${token}`;
        // await getUser()
        setIsReady(true);
      } else {
        setIsReady(false);
      }
      setIsLoading(false);
    }

    loadUserFromCookies();
  }, []);

  async function getRecoveryPassword(email: string) {
    try {
      const response = await recoveryPasswordByEmail({ email }).then(
        (res) => res
      );
      setUser(response);
      showAlert(
        "Sucess",
        "Pronto! 😊, agora aguarde nosso email de confirmacao..."
      );
      setTimeout(() => router.push("/login"), 1000 * 5);
    } catch (error) {
      showAlert(
        "Error",
        "Ocorreu um erro, confira os dados e tente novamente!"
      );
      // handle error
    }
  }

  async function loadFromStorage() {
    const auth = await getCookie("accessToken");
    const myUser: any = await getCookie("user");
    const user = JSON.parse(myUser);

    if (auth && myUser) {
      setToken(auth);
      setPlan(user.planType);
      if (user.planType === "FREE") {
        loadTime();
      } else {
        paymentValidation();
      }
    } else {
      setPlan("");
      setToken("");
      setUser({});
    }
  }

  useEffect(() => {
    const myUser = user && JSON.parse(user);
    if (myUser && myUser.planType === "FREE") {
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        plan,

        getRecoveryPassword,
        state,
        startTime,
        game,
        setGame,
        register,
        isReady,
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): ContextProps => useContext(UserContext);
