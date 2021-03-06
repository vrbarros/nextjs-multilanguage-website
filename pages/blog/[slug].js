import Layout from '../../components/Layout';
import BlogPost from '../../components/BlogPost';
import StoryblokService from '../../utils/storyblok-service';
import useStoryblok from '../../utils/useStorybrok';

function Post(props) {
  const { story: initialStory, language } = props;

  const { story } = useStoryblok({ initialStory });

  return (
    <Layout language={language}>
      <BlogPost blok={story.content} />
    </Layout>
  );
}

export async function getServerSideProps({ locale, defaultLocale, resolvedUrl }) {
  const language = locale || defaultLocale;
  let trimDefault = resolvedUrl.replace('/en/blog', '/blog');
  let res = await StoryblokService.get(`cdn/stories${trimDefault}`);

  return { props: { story: res.data.story, language } };
}

export default Post;
