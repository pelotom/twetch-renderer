import { storiesOf } from "@storybook/react";
import { useState } from "react";
import TwetchRenderer from "../src";

// import './App.css';
// import "./styles.css";

const cases: { txid: string; label: string }[] = [
  {
    txid: "221f3249d9c8b97f96c2b526cc56084e3f206c3ae4a5705510000a845261c922",
    label: "basic",
  },
  {
    txid: "56f11028376146bacc5d9ac2e47cca86ed2e881d7355c8c896874fa4437fa592",
    label: "youtube link and quoted twetch",
  },
  {
    txid: "94ff4d5f66ef00a1fede2e88b04ffc6c415e0d6acbb3377539f7ce3db42f3b30",
    label: "multiple quoted twetches",
  },
  {
    txid: "ce2a467027a39dce0bd80952d58c596656225491f8f30643fa7a94fc7cebf93b",
    label: "non-previewable external URLs",
  },
  {
    txid: "370cbff4f22a9fceedb95b2f6693b55c65b5d8ac3d2218219b25896be08900ac",
    label: "simple twitter link",
  },
  {
    txid: "c90eeb1801c2fa13b7d4d28b24b0137cde8f384f18d74598d21d170db578f60c",
    label: "twitter link with 2 images",
  },
  {
    txid: "332e66c8b6033dbb70d7cfb6263de5b012073bd8126f6cac3494b2b387d34c5b",
    label: "TwetchDat tweet with image",
  },
  {
    txid: "a4dd17fd4c98aac876147bc3ab3117242b6d6ffffc225f7b41ca96959a99d00a",
    label: "linked tweet without twdata",
  },
  {
    txid: "31ff81d7543c44dddd94f0faf16ed6542fd0db01bb625419522e6de74839f0a5",
    label: "twitter, youtube, twetch",
  },
  {
    txid: "4e90440f1a7310db6e7c5a40a558decd3357d3dbf0cd97da106343232f64d0d0",
    label: "quote of previous",
  },
  {
    txid: "68726c26a7daba637a33cce5ba7a2e9ef15e0139ffc671231d822a04acdc66b5",
    label: "TwetchDat with 1 image in tweet",
  },
  {
    txid: "f3610d9c03fd8c220dfa783454c1ae9ad9205d35bad0d5c2c556ac0cd78d7618",
    label: "TwetchDat with 4 images in tweet",
  },
  {
    txid: "4b5679838497959bcc20d7a749fb7363ab911692d3634f6b5ee84445cfb4dcaf",
    label: "TwetchDat with 3 images in tweet",
  },
  {
    txid: "47ec7db2ba265ab525dee32daba761a72912db7550d1b8b4e44865d188301ae9",
    label: "single image attached",
  },
  {
    txid: "3ad17c2996dbed056074f7253ab7b3f8a60bc8138e00f7ceaee7ae712fd134ce",
    label: "whole post is just an image bitcoinfile",
  },
  {
    txid: "3ea715fb2ff489dfe9af246499ea423a644040202c2b3503038a45646abce214",
    label: "4 images attached",
  },
  {
    txid: "6e5de85d98aee7250bcaf9405a39358cdc641d9ea15b6cd9fb5ce7189afd1426",
    label: "bitcoinfiles url-attached image",
  },
  {
    txid: "c13423212569606c6860a42b26380b0798219127779629f0e71540479783f528",
    label: "2 bitcoinfiles images and 2 regularly-attached images",
  },
  {
    txid: "51ad1e22e57cefa64536ae1f3fe9d5328c2fe5fabafed114aeddb8fd8eba1a5c",
    label: "megapost",
  },
  {
    txid: "5252fc782b49e81e8ff849e52a535bc40ab478050fb6b9302405642290d3e4e5",
    label: "video and image",
  },
  {
    txid: "64dec7e262a07b4b4b232305e01a66558f3882e6e0e16d07c821724bdf7bc7f6",
    label: "youtube format 1",
  },
  {
    txid: "9c80e00d06ade2e4178f9a3697f8160adadd7131004ec53abd330cea74a57ab4",
    label: "youtube format 2",
  },
];

const stories = storiesOf("cases", module);
cases.forEach(({ txid, label }) =>
  stories.add(label, () => <TwetchRenderer txid={txid} />)
);
