import { Flex, Heading } from "@chakra-ui/react";
import LeftArrowIcon from "components/icons/LeftArrow";
import InternalLink from "components/InternalLink";
import { blog } from "constants/urls";

const AllPosts = () => (
  <InternalLink to={blog}>
    <Flex align="center">
      <LeftArrowIcon />
      <Heading
        bg="linear-gradient(270deg, #9121C2 0%, #FF5E5E 100%)"
        sx={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        w={"fit-content"}
        ml={4}
        as="div"
      >
        All Posts
      </Heading>
    </Flex>
  </InternalLink>
);

export default AllPosts;
