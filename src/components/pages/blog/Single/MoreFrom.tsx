import React  from 'react';
import { Heading, Box, Image, SimpleGrid, Text, Avatar, Flex } from '@chakra-ui/react';
import ParseData from 'components/pages/blog/common/ParseData';
import InternalLink from 'components/InternalLink';
import BlogTag from 'components/pages/blog/common/Tag';

const PostSummary = ({data, tagName}: {data:any, tagName: any}) => {
    const {id, authorName, authorAvatar, thumbnailUrl, slug, excerpt, title, pubDate} = ParseData({data});
    
    return (
        <Box color="secondary.dark" key={id}>
            <Image src={thumbnailUrl} borderRadius="24px" height="376px" objectFit="cover" mb={"32px"}/>
            <BlogTag tag={tagName.toUpperCase()} /> 
            <InternalLink to={`/blog/${slug}`}>
                <Heading variant="subh1" w={"80%"} mt={"12px"}>{title}</Heading>
            </InternalLink>
            <Text opacity="0.5" mt={2}>
                {excerpt}
            </Text>
            <Flex mt={5} color="secondary.dark">
            <Avatar name={authorName} src={authorAvatar} height="40px" width="40px" />
            <Box ml={3}>
                <Text variant="body3">{authorName}</Text>
                <Text opacity="0.4" mt={0} variant='smallbody2'>{pubDate}</Text>
            </Box>
        </Flex>
        </Box>
    )
};

const MoreFrom = ({moreFromTagName, moreBlogs}: {moreFromTagName: string, moreBlogs: any[]}) => {
    return (
        <Box mt={"92px"}>
            <Heading>More from {moreFromTagName}</Heading>
            <SimpleGrid columns={{base: 1, md: 2}} spacingX={10} mt={"42px"} w={"100%"} spacingY={{base: 16, md: 0}}>
                {
                    moreBlogs.map(blog => (
                        <PostSummary data={blog} tagName={moreFromTagName} />
                    ))
                }
            </SimpleGrid>
        </Box>
    )
};

export default MoreFrom;