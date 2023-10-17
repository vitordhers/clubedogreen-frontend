import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import FirstBanner from "./components/FirstBanner";
import image1 from "../assets/banner-02-hor.png";
import image2 from "../assets/banner-plans.png";
import signalIcon from "../assets/chart.png";
import vipIcon from "../assets/vip.svg";
import Image from "next/image";
import { GameProps, useGeneral } from "@/contexts/GeneralContext";
import Analytics from "./components/Analytics";
import spaceman from "../assets/spaceman.png";
import roletaBrasileira from "../assets/roleta_brasileira.png";
import mines from "../assets/mines.png";
import aviator from "../assets/aviator.png";
import jetx from "../assets/jetx.png";
import luckyjet from "../assets/luckyjet.png";
import penaltyShootOut from "../assets/penalty-shoot-out.png";
import dragonTiger from "../assets/dragon-tiger.png";
import fortuneTiger from "../assets/fortune-tiger.png";
import fortuneRabbit from "../assets/fortune-rabbit.png";

const gamesDataFREE = [
  {
    img: fortuneTiger,
    name: "Fortune Tiger",
    status: "ON",
    route: "fortune-tiger",
    botToken: "5924739023:AAH3JVIDfTncmLwh3v2-uzKWk2SkZ_YICIg",
    chatId: "-1001655875813",
  },
  {
    img: mines,
    name: "Mines",
    status: "ON",
    route: "mines",
    botToken: "5981425862:AAEmi2NlMPDVFY0madQ-x8HPd7lT4i7OLwA",
    chatId: "-1001623050766",
  },
] as GameProps[];

const gamesDataVIP = [
  {
    img: fortuneTiger,
    name: "Fortune Tiger",
    status: "ON",
    route: "fortune-tiger",
    botToken: "5924739023:AAH3JVIDfTncmLwh3v2-uzKWk2SkZ_YICIg",
    chatId: "-1001655875813",
  },
  {
    img: fortuneRabbit,
    name: "Fortune Rabbit",
    status: "ON",
    route: "fortune-rabbit",
    botToken: "5981425862:AAEmi2NlMPDVFY0madQ-x8HPd7lT4i7OLwA",
    chatId: "-1001623050766",
  },
  {
    img: spaceman,
    name: "Spaceman",
    status: "ON",
    route: "spaceman",
    botToken: "5924739023:AAH3JVIDfTncmLwh3v2-uzKWk2SkZ_YICIg",
    chatId: "-1001655875813",
  },
  {
    img: mines,
    name: "Mines",
    status: "ON",
    route: "mines",
    botToken: "5981425862:AAEmi2NlMPDVFY0madQ-x8HPd7lT4i7OLwA",
    chatId: "-1001623050766",
  },
  {
    img: roletaBrasileira,
    name: "Roleta brasileira",
    status: "ON",
    route: "roleta-brasileira",
    botToken: "5938257780:AAHJDLoiju7OfVRDN7jnWO4ricmjGj6YuGU",
    chatId: "-1001878043093",
  },
  {
    img: penaltyShootOut,
    name: "Penalty Shoot Out",
    status: "ON",
    route: "penalty",
    botToken: "6117715321:AAHVhWujMW2soy3C3n2kaGgi9J0vn0PoYz0",
    chatId: "-1701906513",
  },
  {
    img: dragonTiger,
    name: "Dragon Tiger",
    status: "ON",
    route: "dragontiger",
    botToken: "6117715321:AAHVhWujMW2soy3C3n2kaGgi9J0vn0PoYz0",
    chatId: "-1701906513",
  },
] as GameProps[];

const gamesDataLaunch = [
  {
    img: aviator,
    name: "Aviator",
    status: "OFF",
    route: "aviator",
    botToken: "6117715321:AAHVhWujMW2soy3C3n2kaGgi9J0vn0PoYz0",
    chatId: "-1701906513",
  },
  {
    img: jetx,
    name: "Jetx",
    status: "OFF",
    route: "jetx",
    botToken: "6117715321:AAHVhWujMW2soy3C3n2kaGgi9J0vn0PoYz0",
    chatId: "-1701906513",
  },
  {
    img: luckyjet,
    name: "Luckyjet",
    status: "OFF",
    route: "luckyjet",
    botToken: "6117715321:AAHVhWujMW2soy3C3n2kaGgi9J0vn0PoYz0",
    chatId: "-1701906513",
  },
];

const Homepage = () => {
  const router = useRouter();
  const { setGameChoosed } = useGeneral();
  const { user, setGame, startTime, plan } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  async function openSignal(data: GameProps) {
    const myUserCookies: any = await getCookie("user");
    const myUser = JSON.parse(myUserCookies);
    setGame(data);
    if (myUser.planType === "FREE") {
      // FREE
      router.push(`/game/${data.route}`);
    }
    router.push(`/game/${data.route}`);
  }

  return (
    <>
      <Container>
        <Head>
          {/* Add your meta tags here */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <meta name="title" content="yes" />
          <title>Clube do green</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </Head>
        <Navbar />

        <MainContent>
          <SignalsContainer>
            <Title
              onClick={() => console.log(JSON.parse(`${user}`))}
              style={{ color: colors.white, fontSize: "14px" }}
            >
              Olá {user && JSON.parse(`${user}`).Name}, aproveite nossa
              plataforma 💚!
            </Title>
          </SignalsContainer>
          <FirstBanner
            route="https://go.aff.7k-partners.com/7wfiizln?source_id=banner"
            src={image1}
          />
          <FirstBanner route="/plans" src={image2} />
          <Analytics />
          {plan == "FREE" && (
            <SignalsContainer>
              <Title>
                <Image
                  style={{ width: 18, height: 18 }}
                  alt=""
                  src={signalIcon}
                />
                Lista de Sinais
              </Title>
              <List>
                {gamesDataFREE
                  .filter((item) => item.status === "ON")
                  .map((item) => (
                    <Icons
                      onClick={() => openSignal(item)}
                      key={`${item.name}_${item.botToken}`}
                      src={item.img}
                      alt=""
                    />
                  ))}
              </List>
            </SignalsContainer>
          )}

          {plan == "FREE" && (
            <SignalsContainer>
              <Title>
                <Image style={{ width: 18, height: 18 }} alt="" src={vipIcon} />
                Sinais VIP
              </Title>
              <List>
                {gamesDataVIP
                  .filter((item) => item.status === "ON")
                  .map((item) => (
                    <Icons
                      style={{ opacity: 0.75 }}
                      key={`${item.name}_${item.botToken}`}
                      src={item.img}
                      alt=""
                    />
                  ))}
              </List>
            </SignalsContainer>
          )}
          {plan == "VIP" && (
            <SignalsContainer>
              <Title>
                <Image
                  style={{ width: 18, height: 18 }}
                  alt=""
                  src={signalIcon}
                />
                Lista de Sinais
              </Title>
              <List>
                {gamesDataVIP
                  .filter((item) => item.status === "ON")
                  .map((item) => (
                    <Icons
                      onClick={() => openSignal(item)}
                      key={`${item.name}_${item.botToken}`}
                      src={item.img}
                      alt=""
                    />
                  ))}
              </List>
            </SignalsContainer>
          )}

          <SignalsContainer>
            <Title>Próximos lançamentos... 👀🔥</Title>
            <List>
              {gamesDataLaunch.map((item: any) => (
                <Icons
                  style={{ opacity: 0.5, cursor: "disabled" }}
                  key={`${item.name}_${item.botToken}`}
                  src={item.img}
                  alt=""
                />
              ))}
            </List>
          </SignalsContainer>
        </MainContent>
      </Container>
    </>
  );
};

export default Homepage;

import styled, { css } from "styled-components";
import { colors } from "@/assets/styles/colors";
import AuthRoutes from "./components/AuthRoutes";
import { useUser } from "@/contexts/UserContext";
import { json } from "stream/consumers";
import { limit } from "firebase/firestore";
import { getCookie } from "cookies-next";
import Head from "next/head";
const tablet: string = "600px";

export const Global = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  color: ${colors.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
  padding: 12px 8%;
  // Tablet
  @media screen and (min-width: ${tablet}) {
    padding: 12px 8%;
  }
`;

export const Logo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 100px;
  }
  > span {
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  // Tablet
  @media screen and (min-width: ${tablet}) {
    width: 100%;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  // Tablet
  @media screen and (min-width: ${tablet}) {
    width: 580px;
    height: 100%;
  }
`;

export const SignalsContainer = styled.div`
  width: 100%;
  // Tablet
  @media screen and (min-width: 600px) {
    width: 350px;
  }
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 18px;
  color: ${colors.green};
`;

export const List = styled.div`
  width: 100%;
  padding: 24px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  // Tablet
  @media screen and (min-width: 600px) {
    width: 350px;
  }
`;

export const Icons = styled(Image)`
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
    -moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
    box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
  }
`;
