import GetSimilarBlogs from './GetSimilarBlogs';

interface Props {
    slug: string;
}

async function getBlogPostId({slug}: Props) {
    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
        query postEntryQuery {
            postCollection(where: {slug:"${slug}"}) {
              items {
                sys {
                    id
                }
              }
            }
          }
        `
        }),
    });
    const data = await response.json();
    const blogPostId = data.data.postCollection.items[0].sys.id;
    return blogPostId;
}

async function getBlogPostDetails({blogPostId}: {blogPostId: string}) {
    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            query postEntryQuery {
                post(id: "${blogPostId}") {
                    title,
                    excerpt,
                    publishDate,
                    ctaText,
                    slug,
                    authorsCollection {
                        items {
                            name
                            avatar {
                                url
                            }
                        }
                    },
                    tagsCollection {
                        items { name slug }
                    }
                    headerImage {
                        title
                        url
                    }
                    content {
                        json
                        links {
                            assets {
                                block {
                                sys { id  }
                                url
                                }
                            }
                        }
                    }
                }
            }
        `
        }),
    });
    const data = await response.json();
    let blogPostDetails = data.data.post;
    const blogImages:any = {};
    const imagesArrRaw = data.data.post.content.links.assets.block;
    for (let index = 0; index < imagesArrRaw.length; index++) {
        const thisImage = imagesArrRaw[index];
        blogImages[thisImage.sys.id] = thisImage.url;   
    }
    blogPostDetails.images = blogImages;
    return blogPostDetails;
}

const GetBlogPost = async ({slug}: Props) => {
    const blogPostId = await getBlogPostId({slug});
    const blogPostDetails = await getBlogPostDetails({blogPostId});
    const {name: tagName, slug: tagSlug } = blogPostDetails.tagsCollection.items[0];
    const moreBlogs = await GetSimilarBlogs({slug: tagSlug, excludeSlug: slug});
    blogPostDetails.moreFromTagName = tagName;
    blogPostDetails.moreBlogs = moreBlogs;
    return blogPostDetails;
}

export default GetBlogPost;