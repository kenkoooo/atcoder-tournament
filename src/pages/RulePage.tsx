import { Container, CssBaseline, Link, Typography } from "@material-ui/core";
import React from "react";

export const RulePage = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        ABC Tournament ルール
      </Typography>
      <Typography variant="h5" color="textSecondary" component="p">
        <ul>
          <li>ABC級コンテストの結果を使ったトーナメント戦です。</li>
          <li>
            各試合は 1 対 1 で行われ、AtCoder の ABC
            級のコンテストでの順位が高かった方が勝者となり、次の試合に進出します。
          </li>
          <li>
            ABC級のコンテストとはレーティング更新対象が 0 - 1999
            のコンテストです。
          </li>
          <li>
            ABC級のコンテストのうち、企業がスポンサードしているものについては対象とはなりません。
          </li>
          <li>
            同順位の場合は2020年8月29日 19:00
            JST時点でのレートが高い方を勝者とします。
          </li>
          <li>
            コンテストにおいて以下に該当するユーザーは
            (コンテストで正の点数を取った人数 + 1) 位となります。
            <ul>
              <li>コンテストに参加登録していないユーザー</li>
              <li>コンテストに参加登録したが1回も提出していないユーザー</li>
              <li>
                コンテストに参加登録し、1回以上提出したが点数が得られなかったユーザー
              </li>
            </ul>
          </li>
          <li>
            各試合の対象となる ABC は以下のとおりです。
            <ul>
              <li>
                1 回戦 -{" "}
                <Link href="https://atcoder.jp/contests/abc177">
                  AtCoder Beginner Contest 177
                </Link>
              </li>
              <li>
                2 回戦 -{" "}
                <Link href="https://atcoder.jp/contests/abc178">
                  AtCoder Beginner Contest 178
                </Link>
              </li>
              <li>
                3 回戦 -{" "}
                <Link href="https://atcoder.jp/contests/abc179">
                  AtCoder Beginner Contest 179
                </Link>
              </li>
              <li>
                4 回戦 -{" "}
                <Link href="https://atcoder.jp/contests/abl">
                  ACL Beginner Contest
                </Link>
              </li>
              <li>準決勝以降 - AtCoder からアナウンスがあり次第更新します。</li>
            </ul>
          </li>
        </ul>
      </Typography>
    </Container>
  );
};
