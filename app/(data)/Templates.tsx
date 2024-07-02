export default [
    {
      name: 'Code Generator',
      desc: 'An AI tool that generates code snippets based on your specific requirements.',
      category: 'Development',
      icon: '/code-generator.svg',
      aiPrompt: 'Generate a code snippet for the given problem statement and requirements. Provide the output in a readable code format.',
      slug: 'Code-Generator',
      form: [
        {
          label: 'Enter your problem statement',
          field: 'input',
          name: 'problemStatement',
          required: true
        },
        {
          label: 'Enter specific requirements',
          field: 'textarea',
          name: 'requirements',
        }
      ]
    },
    {
      name: 'Youtube Description',
      desc: 'An AI tool that generates engaging YouTube video descriptions.',
      category: 'Video',
      icon: '/youtube-color.svg',
      aiPrompt: 'Create a compelling YouTube video description based on the given video title and outline. Format the output in a user-friendly text format.',
      slug: 'Youtube-Description',
      form: [
        {
          label: 'Enter your video title',
          field: 'input',
          name: 'videoTitle',
          required: true
        },
        {
          label: 'Enter video outline',
          field: 'textarea',
          name: 'videoOutline',
        }
      ]
    },
    {
      name: 'Blog Topic Ideas',
      desc: 'An AI tool that generates creative blog topic ideas.',
      category: 'Blog',
      icon: '/bulb-creative-idea.svg',
      aiPrompt: 'Generate 5 unique blog topic ideas based on the given niche and outline. Present the ideas in bullet points.',
      slug: 'Blog-Topic-Ideas',
      form: [
        {
          label: 'Enter your blog niche',
          field: 'input',
          name: 'blogNiche',
          required: true
        },
        {
          label: 'Enter blog outline',
          field: 'textarea',
          name: 'blogOutline',
        }
      ]
    },
    {
      name: 'Instagram Post Generator',
      desc: 'An AI tool that creates catchy Instagram post captions.',
      category: 'Social Media',
      icon: '/instagram.svg',
      aiPrompt: 'Create 5 engaging Instagram post captions based on the given niche and outline. Format the captions in bullet points.',
      slug: 'Instagram-Post-Generator',
      form: [
        {
          label: 'Enter your Instagram niche',
          field: 'input',
          name: 'instagramNiche',
          required: true
        },
        {
          label: 'Enter Instagram post outline',
          field: 'textarea',
          name: 'instagramOutline',
        }
      ]
    },
    {
      name: 'Youtube Tags',
      desc: 'An AI tool that generates relevant YouTube video tags.',
      category: 'Video',
      icon: '/video-player.svg',
      aiPrompt: 'Generate a list of relevant YouTube tags based on the given video title and outline. Present the tags in a comma-separated format.',
      slug: 'Youtube-Tags',
      form: [
        {
          label: 'Enter your video title',
          field: 'input',
          name: 'videoTitle',
          required: true
        },
        {
          label: 'Enter video outline',
          field: 'textarea',
          name: 'videoOutline',
        }
      ]
    },
    {
      name: 'Rewrite Article',
      desc: 'An AI tool that rewrites articles to improve clarity and readability.',
      category: 'Writing',
      icon: '/paper-pencil.svg',
      aiPrompt: 'Rewrite the given article to enhance its clarity and readability. Present the revised article in a user-friendly text format.',
      slug: 'Rewrite-Article',
      form: [
        {
          label: 'Enter the article content',
          field: 'textarea',
          name: 'articleContent',
          required: true
        },
        {
          label: 'Enter additional instructions (optional)',
          field: 'textarea',
          name: 'instructions',
        }
      ]
    },
    {
      name: 'Blog Title',
      desc: 'An AI tool that generates catchy blog titles.',
      category: 'Blog',
      icon: '/blog.svg',
      aiPrompt: 'Generate a list of 5 catchy blog titles based on the given niche and outline. Present the titles in bullet points.',
      slug: 'generate-blog-title',
      form: [
        {
          label: 'Enter your blog niche',
          field: 'input',
          name: 'blogNiche',
          required: true
        },
        {
          label: 'Enter blog outline',
          field: 'textarea',
          name: 'blogOutline',
        }
      ]
    },
    {
      name: 'Instagram Hash Tag Generator',
      desc: 'An AI tool that generates Instagram hashtags based on your post content.',
      category: 'Social Media',
      icon: '/hash2.svg',
      aiPrompt: 'Create 10 relevant hashtags for an Instagram post based on the given niche and outline.',
      slug: 'Instagram-Hash-Tag-Generator',
      form: [
          {
              label: 'Enter your Instagram niche',
              field: 'input',
              name: 'instagramNiche',
              required: true
          },
          {
              label: 'Enter Instagram post outline',
              field: 'textarea',
              name: 'instagramOutline',
          }
      ]
  }
  
  ];
  