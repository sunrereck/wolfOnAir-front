import React from "react";
import { RouteComponentProps } from "react-router-dom";

import WithAuth from '@/hoc/WithAuth';

import HomeContainer from "@/containers/HomeContainer";
import PageTemplate from "@/components/templates/PageTemplate";

function Home({ history }: RouteComponentProps) {
  return (
    <PageTemplate>
      <HomeContainer history={history} />
    </PageTemplate>
  );
}

export default WithAuth(Home);