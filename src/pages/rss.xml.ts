import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../config';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.url,
    items: posts.map((post) => {
      const [lang, ...slugParts] = post.id.split('/');
      const slugWithoutLang = slugParts.join('/');
      const htmlContent = post.rendered?.html;
      const bodyContent = post.body ? `<content:encoded><![CDATA[${post.body}]]></content:encoded>` : '';

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${lang}/blog/${slugWithoutLang}/`,
        content: htmlContent,
        customData: !htmlContent ? bodyContent : '',
      };
    }),
  });
}
