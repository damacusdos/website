import { Flex } from "@chakra-ui/react";
import Menu from "../common/Menu";
import Feed from "./Feed";

const Content = ({ feedContent }: { feedContent: any }) => (
  <Flex
    maxW="1240px"
    mx="auto"
    mt={{ base: "92px", lg: "92px", xl: "92px" }}
    direction={{ base: "column", xl: "row" }}
  >
    <Menu slug={"home"} />
    <Feed feedContent={feedContent} />
  </Flex>
);

export default Content;
