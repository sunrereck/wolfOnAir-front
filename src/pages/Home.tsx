import React from "react";
import { RouteComponentProps } from "react-router-dom";

import WithAuth from '@/components/hoc/WithAuth';

import HomeContainer from "@/components/organisms/HomeContainer";
import PageTemplate from "@/components/templates/PageTemplate";

function Home({ history }: RouteComponentProps) {
  return (
    <PageTemplate>
      <HomeContainer history={history} />
    </PageTemplate>
  );
}

export default WithAuth(Home);