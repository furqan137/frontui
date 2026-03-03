// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Toolkit from "../components/home/Toolkit";
import Difference from "../components/home/Difference";
import Partnership from "../components/home/Partnership";
import FAQ from "../components/home/FAQ";
import Footer from "../components/Footer";

import "./styles/LandingPage.css";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    // activate background ONLY on home page
    if (location.pathname === "/") {
      document.body.classList.add("landing-bg-active");
    }

    return () => {
      document.body.classList.remove("landing-bg-active");
    };
  }, [location.pathname]);

  return (
    <div className="landing-page-wrapper">
      <Navbar />

      <section id="home"><Hero /></section>
      <section id="stats"><Stats /></section>
      <section id="features"><Features /></section>
      <section id="toolkit"><Toolkit /></section>
      <section id="difference"><Difference /></section>
      <section id="partnership"><Partnership /></section>
      <section id="faqs"><FAQ /></section>
      <section id="contact"><Footer /></section>
    </div>
  );
}
