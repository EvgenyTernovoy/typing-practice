import { Result } from "antd";
import type { RouteComponentProps } from "@reach/router";

export default function NotFound(_: RouteComponentProps) {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, the page you visited is not available."
    />
  );
}
