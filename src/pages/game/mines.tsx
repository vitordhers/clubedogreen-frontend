import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { gamesData } from "@/lib/gameStatic";
import {
  Unsubscribe,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import signalIcon from "../../assets/chart.png";
import banner from "../../assets/banner_promote.png";
import timerIcon from "../../assets/timer.png";

const Mines = () => {
  const [room, setRoom] = useState<string>();
  const router = useRouter();
  const { id } = router.query;
  const { user, game } = useUser();

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [dataList, setData] = useState<any>([]);

  // FIREBASE CONNECTION

  const citiesCol = useMemo(() => collection(db, "mines"), []);
  const myQuery = useMemo(
    () => query(citiesCol, limit(1), orderBy("timestamp", "desc")),
    [citiesCol]
  );

  useMemo(() => {
    const unsubscribe = onSnapshot(myQuery, (querySnapshot) => {
      const dataRes: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dataRes.push({
          attempts: data.attempts,
          mines: data.mines,
          result: data.result,
          timestamp: data.timestamp,
        });
      });
      setData(dataRes);
    });
    return () => unsubscribe();
  }, [myQuery]);

  return (
    <>
      <Container>
        <Navbar />
        <MainContent>
          <div style={{ color: colors.green, fontWeight: 600 }}>MINES</div>
          <Link href="https://go.aff.7k-partners.com/7wfiizln?source_id=banner">
            <Banner alt="" src={banner} />
          </Link>
          <SignalsContainer>
            {/* 
						<Title onClick={() => console.log(dataList)}>
							<Image alt='' src={signalIcon} />
							Sinais
						</Title>
						*/}
            <List>
              {dataList.length > 0 &&
                dataList.map((item: any, i: number) =>
                  item.result === "ENTRADA ENCERRADA" ? (
                    <ItemResult
                      style={i === 0 ? {} : { opacity: 0.5 }}
                      key={item.timestamp}
                    >
                      <ItemBlock1>
                        <Image
                          style={{ width: 17, height: 19 }}
                          alt=""
                          src={timerIcon}
                        />
                        Horario -{" "}
                        {new Date(item.timestamp.seconds * 1000).toLocaleString(
                          "pt-br",
                          {
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </ItemBlock1>
                      <ItemBlock2>
                        Entrada<div style={{ fontSize: 12 }}>{item.result}</div>
                      </ItemBlock2>
                    </ItemResult>
                  ) : (
                    <ItemResult
                      style={i === 0 ? {} : { opacity: 0.5 }}
                      key={item.timestamp}
                    >
                      <ItemBlock1>
                        <Image
                          style={{ width: 17, height: 19 }}
                          alt=""
                          src={timerIcon}
                        />
                        Horario -{" "}
                        {new Date(item.timestamp.seconds * 1000).toLocaleString(
                          "pt-br",
                          {
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </ItemBlock1>
                      <ItemBlock2>
                        Minas<div>{item.mines}</div>
                      </ItemBlock2>
                      <ItemBlock2>
                        Tentativas<div>{item.attempts}</div>
                      </ItemBlock2>
                      <ItemBlock3>
                        Entrada
                        <div>
                          <div>{item.result}</div>
                        </div>
                      </ItemBlock3>
                    </ItemResult>
                  )
                )}
            </List>
            <GameContainer>
              <iframe
                src="https://go.aff.7k-partners.com/x1pm8z6k?source_id=mines"
                title="Embedded Website"
                width="100%"
                height="500px"
              ></iframe>
            </GameContainer>
          </SignalsContainer>
        </MainContent>
      </Container>
    </>
  );
};

export default Mines;

const ItemResultComponent = (item: any) => {
  const jsDate = item.timestamp && item.timestamp;
  const formattedDate = moment(jsDate).format("HH:mm");

  return (
    <ItemResult key={item.timestamp}>
      <ItemBlock1>
        <Image style={{ width: 17, height: 19 }} alt="" src={timerIcon} />
        Horario - {formattedDate}
      </ItemBlock1>
      <ItemBlock2>
        Minas<div>{item.mines}</div>
      </ItemBlock2>
      <ItemBlock2>
        Tentativas<div>{item.attempts}</div>
      </ItemBlock2>
      <ItemBlock3>
        Entrada<div>{item.result}</div>
      </ItemBlock3>
    </ItemResult>
  );
};

import React from "react";
import styled, { css, keyframes } from "styled-components";
import { colors } from "@/assets/styles/colors";
import { useUser } from "@/contexts/UserContext";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
import { timeStamp } from "console";
import { db } from "@/lib/api";
const tablet: string = "600px";

export const ItemResult = styled.div`
  background: #eaeaea;
  padding: 12px 22px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemBlock1 = styled.div`
  width: 100%;
  color: #2d2d2d;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const ItemBlock2 = styled.div`
  width: 100%;
  color: #2d2d2d;
  padding: 0 22px;
  display: flex;
  align-items: center;
  gap: 22px;
  font-weight: 700;
  > div {
    padding: 6px 0;
    width: 100%;
    text-align: center;
    background: ${colors.green};
  }
`;

export const ItemBlock3 = styled.div`
  width: 100%;
  color: #2d2d2d;
  display: flex;
  align-items: center;
  gap: 22px;
  font-weight: 700;
  border-left: 2px solid ${colors.green};
  > div {
    width: 100%;
    padding: 6px 0;
    display: flex;
    justify-content: center;
    > div {
      width: 120px;
      text-align: center;
    }
  }
`;

export const Global = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Container = styled.div`
  width: 100vw;
  color: ${colors.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 24px;
`;

export const GameContainer = styled.div`
  background: transparent;
  height: 600px;
  padding-top: 24px;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 18px;
  color: ${colors.green};
  padding-bottom: 22px;
`;

export const List = styled.div`
  overflow-y: auto;
  width: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;
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

export const Banner = styled(Image)`
  width: 100%;
  height: 125px;
  border-radius: 12px;
  // Tablet
  @media screen and (min-width: 600px) {
    width: 350px;
  }
`;

export const Item = styled.div`
  width: 100%;
  background: ${colors.green};
  color: ${colors.black};
  font-weight: 600;
  text-align: center;
  padding: 12px 24px;
  border-radius: 12px;
  -webkit-box-shadow: 10px 10px 48px -15px rgba(3, 224, 87, 1);
  -moz-box-shadow: 10px 10px 48px -15px rgba(, 224, 87, 1);
  box-shadow: 10px 10px 48px -15px rgba(3, 224, 87, 1);
`;

const pulse = keyframes`
  0% {
    transform: scale(0.9);
	-webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 0.2);
		-moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 0.2);
		box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 0.2);
  }
  70% {
    transform: scale(1);
	-webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 0.6);
		-moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 0.6);
		box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 0.6);
  }
  100% {
    transform: scale(0.9);
	-webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		-moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
  }
`;

const PulseDiv = styled.div`
  animation: ${pulse} 2s infinite;
  color: ${colors.black};
  padding: 12px 16px;
  font-weight: 600;
  text-align: center;
  background: ${colors.green};
  border-radius: 12px;
`;

// Usage:
