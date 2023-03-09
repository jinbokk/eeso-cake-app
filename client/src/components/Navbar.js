import React, { useEffect, useState } from "react";

import "./css/navbar.css";

import { useNavigate, NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import useWindowDimensions from "../hooks/useWindowDimensions";
import NavbarAside from "./NavbarAside";
import { useDispatch, useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { userActions } from "../redux/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { width } = useWindowDimensions();

  const { loginResult, authUserData } = useSelector((state) => state.user);

  const logoutHandler = () => {
    const confirm = window.confirm("로그아웃 하시겠습니까?");
    dispatch(userActions.logoutUser(confirm)).then((res) => {
      if (res.logoutSuccess) {
        window.alert("로그아웃 되었습니다");
        navigate("/", { replace: true });
      } else {
        window.alert(res.message);
      }
    });
  };

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll === 0) {
      setScrolled(false);
    } else if (currentScroll > 0) {
      setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  let activeStyle = {
    color: "var(--bg-accent)",
  };

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: -8,
      top: 15,
      border: `2px solid var(--bg)`,
      padding: "0 4px",
    },
  }));

  return (
    <>
      <div
        className="nav_container_top"
        style={
          scrolled
            ? {
                boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
                transition: "box-shadow 0.3s",
              }
            : {
                boxShadow: "rgba(99, 99, 99, 0.3) 0px 2px 8px 0px",
                transition: "box-shadow 0.3s",
              }
        }
      >
        <div className="nav_container">
          {width < 992 ? (
            <>
              <NavLink to="/">
                <div>
                  <img
                    src="/images/nav_logo.png"
                    alt=""
                    className="main_logo"
                  />
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">
                <div>
                  <img
                    src="/images/nav_logo.png"
                    alt=""
                    className="main_logo"
                  />
                </div>
              </NavLink>

              <NavLink
                to="/"
                end
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">HOME</div>
              </NavLink>

              <NavLink
                to="/about"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">ABOUT</div>
              </NavLink>

              <NavDropdown
                navMenu={{
                  mainTitle: "GUIDE",
                  flexDir: "col",
                  item: [
                    { subTitle: "RICE CAKE GUIDE", link: "/guide/rice" },
                    { subTitle: "BREAD CAKE GUIDE", link: "/guide/bread" },
                  ],
                }}
                slim={true}
              />

              <NavDropdown
                navMenu={{
                  mainTitle: "CAKES",
                  flexDir: "col",
                  item: [
                    {
                      subTitle: "RICE CAKES",
                      link: "/cakes/rice",
                      imgSrc: "/images/rice_cake_icon.png",
                    },
                    {
                      subTitle: "BREAD CAKES",
                      link: "/cakes/bread",
                      imgSrc: "/images/bread_cake_icon.png",
                    },
                    {
                      subTitle: "TART CAKES",
                      link: "/cakes/tart",
                      imgSrc: "/images/tart_cake_icon.png",
                    },
                  ],
                }}
              />

              <NavLink
                to="/order/all"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">ORDER</div>
              </NavLink>

              <NavLink
                to="/faq"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">FAQ</div>
              </NavLink>

              <NavLink
                to="/contact"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <div className="nav_menu">CONTACT</div>
              </NavLink>

              <div>
                <div className="util_container">
                  <div className="user_container mx-5">
                    {authUserData && authUserData.isAuth ? (
                      <div className="d-flex">
                        <div onClick={logoutHandler} className="mx-3 user_btn">
                          로그아웃
                        </div>
                        <NavLink
                          to="/user/mypage/order-history"
                          className="mx-3 user_btn"
                        >
                          마이페이지
                        </NavLink>
                        <NavLink
                          to="/user/cart"
                          style={{ marginLeft: "1.5rem" }}
                          className="user_btn"
                        >
                          <StyledBadge
                            badgeContent={
                              (authUserData.cart && authUserData.cart.length) ||
                              null
                            }
                            color="error"
                          >
                            <BsCart4 className="cartIcon user_btn" />
                          </StyledBadge>
                        </NavLink>
                      </div>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          style={({ isActive }) =>
                            isActive ? activeStyle : null
                          }
                        >
                          로그인
                        </NavLink>
                        <span className="mx-2">/</span>
                        <NavLink
                          to="/register"
                          style={({ isActive }) =>
                            isActive ? activeStyle : null
                          }
                        >
                          회원가입
                        </NavLink>
                      </>
                    )}
                  </div>
                  <a
                    href="https://www.instagram.com/eeso_cake/?hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="/icons/instgram_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                  <a
                    href="https://blog.naver.com/eesocake"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="/icons/naver_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                  <a
                    href="https://pf.kakao.com/_ZyKnd"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="/icons/kakaotalk_mini.png"
                      alt=""
                      className="link_icon"
                    />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {width < 992 ? (
        <NavbarAside
          loginResult={loginResult}
          authUserData={authUserData}
          logoutHandler={logoutHandler}
          StyledBadge={StyledBadge}
          BsCart4={BsCart4}
        />
      ) : null}
    </>
  );
};

export default Navbar;
