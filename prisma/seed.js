const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Uketa Admin",
      email: "admin@uketa.online",
      secret: "$2b$12$lMEkL/MHtAxl2K87QuYAoeq.kDzqsoEWr1qtWFJNiyJRqa9OzUsYC",
    },
  });

  // Instructor one
  await prisma.instructor.create({
    data: {
      instructor: "Dr Nataliey Bitature",
      shortDesc:
        "I have seen how the principles taught in this course have changed lives, and I can’t wait to see your progress. The changes will become evident to those around you, and the skills you learn will stay with you for a lifetime",
      desc: "Dr. Nataliey Bitature is a seasoned educator and coach with a passion for learning. She holds multiple executive education certifications from the Harvard Kennedy School, a Master's in Social Entrepreneurship with a specialization in Project Management from Hult International University, and an undergraduate degree and Honorary Doctorate in Business and Innovation from Keele University, UK. As the Chair of the Save the Children Africa Advisory Board, a Board member for business incubators Start Up Hub Africa and the Makerere Innovation and Incubation Centre, and a council member for the Women‘s Indian Chamber of Commerce and Industry-Global Impact for Businesswomen, Entrepreneurs, and Professionals, Nataliey brings a wealth of experience and expertise to her coaching practice. In addition to her professional roles, Nataliey is the founder of Musana Carts, a social enterprise building solar-powered street food vending carts, and HER, an online mentorship platform with over 4000 young African women. She has been recognized by Forbes 30 Under 30, The World Bank, The Bill & Melinda Gates Foundation, and the World Economic Forum as a business leader and innovator. As a speaker, Nataliey has represented organizations such as UNFPA, UNDP, Rotary International, and ILO, advocating for youth and women's empowerment. With her extensive knowledge and experience, Dr. Nataliey Bitature is an excellent coach for those looking to develop their skills and advance in their careers.",
      image:
        "https://res.cloudinary.com/daecbszah/image/upload/v1677774378/coaches/nataliey_snfevf.jpg",
      rating: "4.4",
      reviews: "801",
      students: "951",
      courses: "3",
      website: "https://www.natalieybitature.com",
      youtube: "https://www.youtube.com/@DrNatalieyBitature",
      linkedin: "https://ug.linkedin.com/in/natalieybitature",
      course: {
        create: [
          {
            name: "Personal Development",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774864/course%20images/Personal_Development_Course_Thumbnail_a6fhth.jpg",
            shortDesc:
              "This course is designed to equip you with the necessary tools and strategies to kickstart your personal development journey.",
            longDesc:
              "Personal development is an ongoing journey that we all embark on to become the best versions of ourselves. It requires taking a step back and reflecting on our lives, setting goals, and making positive changes. This course is designed to equip you with the necessary tools and strategies to kickstart your personal development journey.",
            priceUGX: 250000,
            priceUSD: 69,
            rating: "5",
            ratingCount: "248",
            studentCount: "306",
            updateDate: "July 10 2022",
            introduction:
              "Overall, this course is designed to help you take the necessary steps towards achieving personal growth and development. Through a series of activities and strategies, you will learn how to set realistic goals, rewire your mindset, communicate effectively, and create a supportive network of mentors and peers.",
            moduleCount: "6 Modules",
            // tutor: "Dr. Nataliey Bitature",
            // tutorImage: "/course_images/personal-development.png",
            previewVideo: "https://www.youtube.com/embed/F4Vk-cHllGE",
            paymentLink:
              "https://sandbox-flw-web-v3.herokuapp.com/pay/2zowqgrmjasf",
            lectures: {
              create: [
                {
                  title: "Meet your coach",
                  activity: "Personal Development",
                  description: "",
                  videoUrl:
                    "https://drive.google.com/file/d/1keSFgZhWGDTLPseEtoa7E6Pb-PcOlM0d/preview",
                  duration: 50,
                },
                {
                  title: "Reflection",
                  activity: "Personal Development",
                  description:
                    "This unit is all about reflection. You will learn to evaluate yourself on four levels; mental, emotional, physical, and spiritual. Through a series of activities, you will be able to assess your strengths and weaknesses, understand your personal gaps, and set realistic goals to achieve success.",
                  videoUrl:
                    "https://drive.google.com/file/d/1GgVR-f1AfKQMHNKLkRJU0Q4SPYRQch5S/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Reflection",
                        file: "https://drive.google.com/file/d/1B_YHgZIZ9wNDLjlI2A-fTIioaExS0kWV/view",
                      },
                    ],
                  },
                },
                {
                  title: "Goals, Habits and Routines",
                  activity: "Personal Development",
                  description:
                    "In this unit, you will learn about the importance of goal setting and how to create SMART and FAST goals. You will also explore the difference between wishes and goals, long-term vs short-term goals, and the importance of creating a timeline. Additionally, you will learn about creating systems, rewards, triggers, and behavioral conditioning to help you achieve your goals.",
                  videoUrl:
                    "https://drive.google.com/file/d/1k6NzCVqFBaMQhBONgwvM0gAbnMhbCQ3w/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Goals, Habits and Routines",
                        file: "https://drive.google.com/file/d/1ZZ4t46-E_75A9VMjF6QBu3WkEwms67XF/view",
                      },
                    ],
                  },
                },
                {
                  title: "Self talk and Positivity",
                  activity: "Personal Development",
                  description:
                    "Self-talk and positivity are crucial to personal development. This unit focuses on the power of positive thinking and self-talk. You will learn to rewire your brain and override negative thoughts, catch negative thoughts, and replace them with positive ones. Additionally, you will learn the importance of mantras and affirmations, morning and evening routines, and the impact of optimism.",
                  videoUrl:
                    "https://drive.google.com/file/d/1FlxMZyhvTQq7xGkWIfC-zB2DDy5yFCBl/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Self talk and Positivity",
                        file: "https://drive.google.com/file/d/1ta5ZvpnENocw3zucl98S_b5xb7cv6EQ6/view",
                      },
                    ],
                  },
                },
                {
                  title: "Emotional Intelligence and Communications",
                  activity: "Personal Development",
                  description:
                    "Communication and emotional intelligence are essential skills in personal development. This unit covers the importance of physical communication and emotional intelligence, including active listening, having difficult conversations, and understanding your audience. You will also learn about the importance of accountability and identifying your insecurities, as well as finding a work buddy or mentor to keep you in check.",
                  videoUrl:
                    "https://drive.google.com/file/d/1YyZu3eF23XVF3oYSsg_fIrCTxjyl_k1Y/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Emotional Intelligence and Communications",
                        file: "https://drive.google.com/file/d/13LBcCz5TDYl1oFPb0mYQ_082cGrK1fkv/view",
                      },
                    ],
                  },
                },
                {
                  title: "Mentors, Networking and Visibility",
                  activity: "Personal Development",
                  description:
                    "Mentors, your network, and visibility are essential to personal development. In this unit, you will learn about the benefits of having a mentor, identifying the right mentor for you, and tips on being a good mentee. You will also learn about creating a network and making quality connections that can help you achieve your personal and professional goals.",
                  videoUrl:
                    "https://drive.google.com/file/d/1It-k7CcjHN4C1i3ldKuJj1l5XGaH1H3D/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Mentors, Networking and Visibility",
                        file: "https://drive.google.com/file/d/1t_eTW0NR7RdeKq-PUSW3ajYniK4DmVv2/view",
                      },
                    ],
                  },
                },
                {
                  title: "Community",
                  activity: "Personal Development",
                  description:
                    "The final unit is all about community and giving back. You will learn about the abundance mindset, supporting others, and paying it forward. You will also explore the importance of dreaming big, visualizing your best self, and overcoming your fears to achieve your personal goals.",
                  videoUrl:
                    "https://drive.google.com/file/d/1q3-JWEXFzZvf9PbCALKm-k-453RQB3Wb/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Community",
                        file: "https://drive.google.com/file/d/1VfD3mCR3UMhbB_ION-V9tOXY2bZpQag9/view",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Public speaking",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774867/course%20images/Public_speaking_Course_Thumbnail_rqbvhn.jpg",
            shortDesc:
              "Enroll in the Public Speaking course today and take the first step towards becoming a captivating speaker who can make a lasting impression on your audience.",
            longDesc:
              "Enroll in the Public Speaking course today and take the first step towards becoming a captivating speaker who can make a lasting impression on your audience. With the skills and techniques you'll learn in this course, you'll be able to confidently and effectively communicate your message to any audience. Don't miss out on this opportunity to improve your public speaking skills and take your career or business to the next level.",
            priceUGX: 100000,
            priceUSD: 27,
            rating: "4.1",
            ratingCount: "132",
            studentCount: "156",
            updateDate: "August 18 2021",
            introduction:
              "Learn the necessary tips, tricks, and strategies to make great speeches and presentations and represent your company or business with confidence.",
            moduleCount: "3 Modules",
            // tutor: "Dr. Nataliey Bitature",
            // tutorImage: "/course_images/public-speaking.png",
            previewVideo: null,
            paymentLink:
              "https://sandbox-flw-web-v3.herokuapp.com/pay/rtunnab1ygiv",
            lectures: {
              create: [
                // {
                //   title: "Instructor video",
                //   activity: "Public speaking",
                //   description:
                //     "The course begins with a guided self-assessment of the 4 key levels of our lives.",
                //   videoUrl:
                //     "https://drive.google.com/file/d/17Q0RkEXEOIvG55fq7PkKLOAV_iRgJNtf/preview",
                //   duration: 1.46,
                // },
                // {
                //   title: "Introduction public speaking",
                //   activity: "Public speaking",
                //   description:
                //     "The course begins with a guided self-assessment of the 4 key levels of our lives.",
                //   videoUrl:
                //     "https://drive.google.com/file/d/1uPPFyzChv2uHNJIcD5iP66nq6bOIkCNq/preview",
                //   duration: 1.46,
                // },
                {
                  title: "Strategy",
                  activity: "Public speaking",
                  description:
                    "In this unit, you'll learn about the importance of having a strategy when it comes to public speaking. You'll discover how to identify your audience and tailor your message to meet their needs. You'll explore techniques for structuring your speech, creating a clear message and purpose. By the end of this unit, you'll have the foundation you need to create a compelling speech that connects with your audience.",
                  videoUrl:
                    "https://drive.google.com/file/d/1-l3XtxEqkYOZG40kYljxODQdL1uIYD2W/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Strategy",
                        file: "https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/view",
                      },
                    ],
                  },
                },
                {
                  title: "Content",
                  activity: "Public speaking",
                  description:
                    "In this unit, you'll learn how to create engaging content for your speeches and presentations. You'll explore the different types of content that can be used in public speaking, including stories, anecdotes, statistics, and facts. You'll also learn how to create visuals and supporting resources to accompany your speech.",
                  videoUrl:
                    "https://drive.google.com/file/d/1EICdMEvNpVtYMdKuTNn0SzpziEqjRY-o/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Content",
                        file: "https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/view",
                      },
                    ],
                  },
                },
                {
                  title: "Delivery (Part 1)",
                  activity: "Public speaking",
                  description:
                    "In this two part unit, you'll learn how to deliver your speech with confidence and impact. You'll explore techniques for managing nerves, projecting your voice, using body language effectively, and engaging with your audience. By the end of this unit, you'll have the skills and confidence you need to deliver a polished and professional speech.",
                  videoUrl:
                    "https://drive.google.com/file/d/1kmXHBnDiHNEIY_W2j2446vTgvny4HJXR/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Delivery (Part 1)",
                        file: "https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/view",
                      },
                    ],
                  },
                },
                {
                  title: "Delivery (Part 2)",
                  activity: "Public speaking",
                  description:
                    "In this two part unit, you'll learn how to deliver your speech with confidence and impact. You'll explore techniques for managing nerves, projecting your voice, using body language effectively, and engaging with your audience. By the end of this unit, you'll have the skills and confidence you need to deliver a polished and professional speech.",
                  videoUrl:
                    "https://drive.google.com/file/d/1Up0Jf5eEY_dQqwYqkYackct0L_GavK7w/preview",
                  duration: 1.46,
                  quiz: {
                    create: [
                      {
                        title: "Delivery (Part 2)",
                        file: "https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/view",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Business Bootcamp",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774877/course%20images/Business_Bootcamp_Course_Thumbnail_rgyu3b.jpg",
            shortDesc:
              "Access the self-paced short course that teaches you how to make amazing business and personal presentations",
            longDesc:
              "Let’s get down to business! With this comprehensive course, we go through the details of a business’ lifespan right from ideation. This course is your one stop place for everything you need to know about starting and growing your business.",
            priceUGX: 250000,
            priceUSD: 69,
            rating: "4.8",
            ratingCount: "148",
            studentCount: "183",
            updateDate: "August 18 2021",
            introduction:
              "Learn the necessary tips, tricks, and strategies to make great speeches and presentations and represent your company or business with confidence.",
            moduleCount: "3 Modules",
            // tutor: "Dr. Nataliey Bitature",
            // tutorImage: "/course_images/business-bootcamp.png",
            previewVideo: null,
            paymentLink:
              "https://sandbox-flw-web-v3.herokuapp.com/pay/0815fuuos4lp",
            lectures: {
              create: [
                {
                  title: "session 1",
                  activity: "Business Bootcamp",
                  description:
                    "The course begins with a guided self-assessment of the 4 key levels of our lives.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Instructor two
  await prisma.instructor.create({
    data: {
      instructor: "Samantha Tinkamanyire",
      shortDesc:
        "I aim to provide structure where there is none, and to help others to do the same",
      desc: "Samantha is a Director at D&I Business Solutions. She also handles Strategic Partnerships and Business Development at Amani Partners. A business development professional who believes strongly in the importance of governance, she works with businesses to help provide strategic operational advice, aid in project management, improve business performance, and create future value. As an accomplished and results-driven business development professional, She has 10+ years of operational and leadership experience, specifically in the service industry. With a strong background in managing operations, teams, and processes.",
      image:
        "https://res.cloudinary.com/daecbszah/image/upload/v1677774382/coaches/samantha_felxgq.png",
      rating: "3.8",
      reviews: "87",
      students: "124",
      courses: "1",
      website: "",
      youtube: "",
      linkedin: "",
      course: {
        create: [
          {
            name: "Customer Service",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774880/course%20images/Customer_Service_Course_Thumbnail_pvt1jh.jpg",
            shortDesc:
              "Throughout the course, you'll learn the skills and strategies needed to create a positive and effective customer service experience.",
            longDesc:
              "Welcome to the UKETA Customer Service course! This online learning platform is designed to help you deliver exceptional service and grow your business. Throughout the course, you'll learn the skills and strategies needed to create a positive and effective customer service experience.",
            priceUGX: 180000,
            priceUSD: 47,
            rating: "4",
            ratingCount: "85",
            studentCount: "107",
            updateDate: "August 18 2021",
            introduction:
              "Throughout the course, you'll learn the skills and strategies needed to create a positive and effective customer service experience.",
            moduleCount: "5 Modules",
            // tutor: "Samantha Tinkamanyire",
            // tutorImage: "/logo/Uketa Logo 10.jpg",
            previewVideo: null,
            paymentLink:
              "https://sandbox-flw-web-v3.herokuapp.com/pay/eipkyu6fgdi2",
            lectures: {
              create: [
                {
                  title: "Why Customer Service Matters",
                  activity: "Customer Service",
                  description:
                    "In this unit, you'll learn about the importance of positive brand awareness and reputation. You'll explore how customer service impacts business growth through referrals and how the cost of poor customer service can affect the bottom line. By the end of this unit, you'll understand why providing excellent customer service is essential to the success of any business.",
                  videoUrl:
                    "https://drive.google.com/file/d/1cllkTHG6g6Y5pr1oTYlam9Ji17SK5wxB/preview",
                  duration: 1.46,
                },
                {
                  title: "Making a Good First Impression",
                  activity: "Customer Service",
                  description:
                    "In this unit, you'll learn about the importance of first impressions in customer service. You'll discover how to create a welcoming and positive environment for customers, and you'll explore techniques for greeting customers that make them feel valued and important. By the end of this unit, you'll know how to create a positive first impression that sets the tone for a great customer service experience.",
                  videoUrl:
                    "https://drive.google.com/file/d/1SEWmTcCDjZERN538lSQME8L5GSVsRy2w/preview",
                  duration: 1.46,
                },
                {
                  title: "Knowing Your Customers",
                  activity: "Customer Service",
                  description:
                    "In this unit, you'll learn about the importance of understanding your customers. You'll identify and understand customer buying motives and explore ways to create 'raving fans' through effective communication and service delivery. You'll also learn how to leverage customer insights to personalize service and exceed expectations. By the end of this unit, you'll know how to create a customer-centric service experience that sets your business apart.",
                  videoUrl:
                    "https://drive.google.com/file/d/1sEcvBdVpq9tHZgHJKc8IGwEhGU0W-N3d/preview",
                  duration: 1.46,
                },
                {
                  title: "Dealing with Complaints",
                  activity: "Customer Service",
                  description:
                    "In this unit, you'll learn how to handle customer complaints. You'll explore the sources of customer complaints and learn strategies for resolving complaints effectively and efficiently. You'll also discover techniques for turning negative experiences into positive ones. By the end of this unit, you'll know how to handle complaints with confidence and turn dissatisfied customers into loyal ones.",
                  videoUrl:
                    "https://drive.google.com/file/d/1wxyXiaSvaImlm7Bj7_QwrXhcWhf-_Iwm/preview",
                  duration: 1.46,
                },
                {
                  title: "Providing Excellent Online Customer Service",
                  activity: "Customer Service",
                  description:
                    "In this unit, you'll learn about the unique challenges and opportunities of providing customer service online. You'll explore strategies for effective communication and service delivery through digital channels, and you'll learn the importance of building trust and relationships with customers online. By the end of this unit, you'll know how to provide excellent customer service through online channels and create a seamless customer experience across all touchpoints.",
                  videoUrl:
                    "https://drive.google.com/file/d/1Qk_3HSoFU2uMX6eWKZ2lcvUFWzn-khi_/preview",
                  duration: 1.46,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Instructor three
  await prisma.instructor.create({
    data: {
      instructor: "Rachael Nalumu",
      shortDesc:
        "Rachael Nalumu is a digital content creator and entrepreneur located in Kampala, Uganda.",
      desc: "After studying finance and economics in university, Rachael began in the digital marketing industry in 2013 when she launched her first online business, Love Lakeri. Love Lakeri was an accessories line that sourced fabrics from crafts shops in Uganda, employed local artisans to create pieces that she designed, where she then would ship them to Canada and sell them on her online store and tradeshows in Canada and the USA. Realizing there was a need to market her own product, Rachael started creating photo and video content, often with the help of her sisters, to promote on platforms such as Instagram and YouTube. Rachael grew her online following on Instagram and YouTube through trending style and beauty content. In 2018, after 5 years of self teaching, taking creative classes, and consistent growth, she began consulting for various brands on their digital marketing needs. With her love for digital creation and branding within social media, she took a leap of faith and moved to Uganda in 2019. She continued to grow her personal brand, Rachael Nalumu (to over 30k followers and subscribers online), her business endeavours and her consultancy agency. Rachael’s career passions are entrepreneurship and creating global businesses through branding and social media. When Rachael isn’t creating social media strategies and content for her brands or her clients&#39; brands or managing her brand partnerships, you can find her planning her next trip (or her life!) with a chilled",
      image:
        "https://res.cloudinary.com/daecbszah/image/upload/v1677774375/coaches/rachael_vykxhq.jpg",
      rating: "4.0",
      reviews: "97",
      students: "104",
      courses: "1",
      website: "",
      youtube: "",
      linkedin: "",
      course: {
        create: [
          {
            name: "Digital Content Creation",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774867/course%20images/Digital_Content_Creation_Course_Thumbnail_qwzljw.jpg",
            shortDesc:
              "Learn the basics of creating engaging digital content and growing your brand on social media platforms.",
            longDesc:
              "Welcome to our Introduction to Digital Content Creation course! In this comprehensive course, you will learn the basics of creating engaging digital content and growing your brand on social media platforms, specifically YouTube and Instagram.",
            priceUGX: 0,
            priceUSD: 0,
            rating: "3.9",
            ratingCount: "74",
            studentCount: "86",
            updateDate: "February 22 2023",
            introduction:
              "By the end of the course, you'll have the knowledge and skills necessary to grow your brand and monetize your social media platforms.",
            moduleCount: "8 Modules",
            // tutor: "Daniel Choudry",
            // tutorImage: "/logo/Uketa Logo 10.jpg",
            previewVideo: null,
            lectures: {
              create: [
                {
                  title: "The Basics",
                  activity: "Digital Content Creation",
                  description:
                    "We'll dive into the importance of understanding your 'why' and vision behind your content, as well as identifying the right platform for your message. We'll also cover how to find your unique niche and voice, and how to make your content discoverable to your target audience.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "What do you need?",
                  activity: "Digital Content Creation",
                  description:
                    "This covers the essential equipment and tools you'll need to start your platform, including editing software, lighting, location, and sound.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "All about Instagram",
                  activity: "Digital Content Creation",
                  description:
                    "We'll focus on mastering Instagram, including tips for creating engaging stories, reels, hashtags, and a professional bio. We'll also cover how to develop an aesthetic for your page and the optimal posting frequency.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "All about Youtube",
                  activity: "Digital Content Creation",
                  description:
                    "This unit shifts the focus to YouTube and covers the key elements of creating successful videos, including keywords, thumbnails, and editing techniques. We'll also discuss the reality of growing a YouTube channel and provide tips for creating a content plan.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "Scheduling your content",
                  activity: "Digital Content Creation",
                  description:
                    "This module covers the importance of scheduling your content and creating a year's worth of content in a few weeks.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "Analytics",
                  activity: "Digital Content Creation",
                  description:
                    "This module dives into analytics and the importance of understanding your numbers, including percentage growth, total followers, accounts engaged, audience demographics, and top-performing content.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "Engaging with your audience",
                  activity: "Digital Content Creation",
                  description:
                    "We'll discuss the importance of following up on your content and engaging with your audience, as well as reposting and repurposing content.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
                {
                  title: "Monetize your social media",
                  activity: "Digital Content Creation",
                  description:
                    "This module will cover the different ways to monetize your social media presence, including paid partnerships and creating a media kit to pitch yourself to brands.",
                  videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
                  duration: 1.46,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Instructor Four
  await prisma.instructor.create({
    data: {
      instructor: "Irene Mutumba",
      shortDesc:
        "Irene Mutumba is a multi-skilled professional teacher, an education and learning specialist, a social innovator and business entrepreneur.",
      desc: "She is a visionary leader, elected an Ashoka Fellow in 2005 for challenging the traditional education system by creating a new fun and active learning environment where young people are encouraged to think and act like entrepreneurs. Irene believes that an entrepreneurial society is best approached through the education system where young people and communities are supported to think and act as entrepreneurs. By holistic engagement of all to take charge, lies the answer to true hope of change making and sustainable development. Irene is both a local and international Award winner for her social impact innovations.",
      image:
        "https://res.cloudinary.com/daecbszah/image/upload/v1677774373/coaches/irene_vpkvsb.jpg",
      rating: "4.2",
      reviews: "104",
      students: "146",
      courses: "1",
      website: "",
      youtube: "",
      linkedin: "",
      course: {
        create: [
          {
            name: "Financial Literacy",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg",
            shortDesc:
              "Learn how to improve your financial literacy and money management skills.",
            longDesc:
              "Welcome to our Financial Literacy or Money Management course! In this course, we will be diving into the world of money and exploring various modules that will help you improve your financial literacy and money management skills.",
            priceUGX: 150000,
            priceUSD: 40,
            rating: "5",
            ratingCount: "74",
            studentCount: "86",
            updateDate: "February 28 2023",
            introduction:
              "Join us on this journey as we learn how to take control of our finances and create a sustainable financial future. Sign up now and let's start building a better financial future together.",
            moduleCount: "5 Modules",
            previewVideo: null,
            lectures: {
              create: [
                {
                  title: "Money Habitudes",
                  activity: "Financial Literacy",
                  description:
                    "In this module, we will be reflecting on our money habits and exploring how they have impacted our lives. We will also be balancing our habits to create a more sustainable financial future.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Reflection On Money Management",
                  activity: "Financial Literacy",
                  description:
                    "In this module, we will be looking at the new opportunities and challenges around money. We will examine current trends and how they affect our finances, both at home and at work. We will also explore how to handle emergencies and unexpected financial situations.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Planning And Budgeting",
                  activity: "Financial Literacy",
                  description:
                    "In this module, we will be discussing the realities of money and the importance of understanding the difference between needs and wants. We will be asking ourselves key questions to help us make informed decisions about our finances. We will also be learning about budgeting and planning to ensure a sustainable financial future.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Saving And Spending",
                  activity: "Financial Literacy",
                  description:
                    "In this module, we will be learning about life skills in relation to money matters. We will be exploring our skills around money, including critical thinking, decision making, and problem solving. We will also be discussing the importance of budgeting, planning, saving, and spending.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Diversifying Income And Investment",
                  activity: "Financial Literacy",
                  description:
                    "In this module, we will be reflecting on enterprise development and investment. We will be discussing who is an entrepreneur, what our ideas are, and identifying our strengths, weaknesses, opportunities, and threats. We will also be exploring our role models and mentors, as well as our personal values.",
                  videoUrl: "",
                  duration: 1.46,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Instructor Five
  await prisma.instructor.create({
    data: {
      instructor: "Joel Muhumuza",
      shortDesc:
        "Joel is the Chief Executive and Director of Flyhub Uganda limited, a fintech subsidiary under Stanbic Uganda Holdings Limited.",
      desc: "As a Certified digital money practitioner with expertise in digital product development, business process mapping, and technology project management, Muhumuza has ten years of experience in the digital financial services arena having worked in Uganda, Kenya, Zambia, USA and South Africa. Prior to joining Fly Hub in 2021 as the Chief Executive, he held roles as the Country Director for JUMO East Africa(Uganda and Kenya)- a digital lending Fintech where he launched Mosente, the second mobile credit product on the MTN menu, and Manager Financial Services at Financial Sector Deepening Uganda(FSDU) in which he was a grants manager, investment analyst and program lead under the DFID and Gates programs for inclusive finance running interventions in microfinance, bulk payments, Group savings, and loans and helped create the Fintech Association-FITSPA. Joel has an MBA from Southern University in Baton rouge, Louisiana where he specialized in Technology and product management, a slight shift from his undergraduate focus on finance and economics. While in Louisiana he developed a love for Sea food, live music, hiking and Continental philosophy which you can find him talking about on his podcast 'What The Theory'",
      image:
        "https://res.cloudinary.com/daecbszah/image/upload/v1677774372/coaches/joel_kutxs3.jpg",
      rating: "3.9",
      reviews: "86",
      students: "127",
      courses: "1",
      website: "",
      youtube: "",
      linkedin: "",
      course: {
        create: [
          {
            name: "Positioning your Business for Funding",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg",
            shortDesc: "Learn how to Position your Business for Funding",
            longDesc:
              "Welcome to the 'Positioning your Business for Funding' course, where you will learn to have a clear understanding of how to analyze your business, access funding, and write a strong proposal to position your business for success.",
            priceUGX: 150000,
            priceUSD: 40,
            rating: "4",
            ratingCount: "108",
            studentCount: "119",
            updateDate: "March 10 2023",
            introduction:
              "Join us on this journey as we learn how to take control of our businesses. Sign up now and let's start building a better financial future together.",
            moduleCount: "5 Modules",
            previewVideo: null,
            lectures: {
              create: [
                {
                  title: "My Business Canvas - Revenue Side",
                  activity: "Positioning your Business for Funding",
                  description:
                    "In this module, we will fill out the business model canvas to analyze our business. We will identify our customers, the value they receive from our product/service, the channels through which they reach us, the type of relationship we have with them, and how we generate revenue.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "My Business Canvas - Cost Side",
                  activity: "Positioning your Business for Funding",
                  description:
                    "In this module, we will analyze the cost side of our business. We will identify the resources we use to provide our product/service, the key activities we take to make the business run, the key partners who support us, and the costs of running our business.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Researching Grants, Funding, and Financing",
                  activity: "Positioning your Business for Funding",
                  description:
                    "In this module, we will learn how to assess if we qualify and can access funding. We will explore how to ask for more information, search online for funding options, and determine the things we need to qualify, such as business registration, licenses, bank accounts, and proper ownership arrangements.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Getting Your Books in Order",
                  activity: "Positioning your Business for Funding",
                  description:
                    "In this module, we will learn how to get our books in order. We will take a basic look at an income statement and balance sheet and learn where to get support in getting these done. We will also explore how to get legal registration and point to business clinics, such as URSB and Stanbic incubators, and online sources.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Writing a Strong Proposal",
                  activity: "Positioning your Business for Funding",
                  description:
                    "In this module, we will learn what a strong proposal should have, including a problem statement, how the funds will be used, and how the use of funds will result in achieving the funder's goals. We will also explore how to submit our proposal.",
                  videoUrl: "",
                  duration: 1.46,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Instructor Six
  await prisma.instructor.create({
    data: {
      instructor: "Shakib Nsubuga",
      shortDesc:
        "Shakib Nsubuga is an experienced business development executive and passionate project manger.",
      desc: "He has demonstrated a history of working in the Ecommerce, real estate, Agriculture, FinTech, Marketing and Advertising sectors.He is a  highly developed and enthused community and social service  professional skilled in ideation,  business Strategy, Negotiation, Policy Analysis, system implementation and customer service. He also has a keen interest in talent development, people management and is particularly keen on lead identification for sales training as a growth Tool for institutions of all sizes. He thrives in the early stages and experimental phases of an organization or business’s development.",
      image:
        "https://res.cloudinary.com/daecbszah/image/upload/v1678448710/coaches/Shakib_2_Uketa_dkkszy.jpg",
      rating: "4",
      reviews: "108",
      students: "119",
      courses: "1",
      website: "",
      youtube: "",
      linkedin: "",
      course: {
        create: [
          {
            name: "People Management",
            image:
              "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg",
            shortDesc:
              "Learn how to effectively manage people in your organization.",
            longDesc:
              "Welcome to the People Management Course! This course is designed to equip you with the knowledge and skills needed to effectively manage people in your organization. Here is an overview of the modules and activities you will be undertaking in this course.",
            priceUGX: 150000,
            priceUSD: 40,
            rating: "4.2",
            ratingCount: "84",
            studentCount: "97",
            updateDate: "March 10 2023",
            introduction:
              "We hope that by the end of this course, you will have a clear understanding of how to manage people effectively in your organization. Good luck!",
            moduleCount: "6 Modules",
            previewVideo: null,
            lectures: {
              create: [
                {
                  title: "Why are you hiring?",
                  activity: "People Management",
                  description:
                    "In this module, you will learn about the different types of people you need to hire for your organization. You will be introduced to the initial hires required for proof of concept, the different types of employees needed during scaling, and the specialists and problem solvers needed for growth. Through Activity 1, you will identify the different types of people you need for your organization.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "How to recruit/build your team",
                  activity: "People Management",
                  description:
                    "In this module, you will learn how to recruit and build your team. You will be introduced to various assessment tools, including interviews, references, and case studies. You will also learn about biases to look out for when recruiting a diverse range of people. Through an assignment, you will conduct a needs assessment for your current team.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Setting your team foundation",
                  activity: "People Management",
                  description:
                    "In this module, you will learn about setting the foundation for your team. You will be introduced to clear onboarding processes, the importance of understanding your vision/mission/OKRs, job descriptions, hierarchy and company structure, sphere of control, KPIs, resources, and reporting matrices. Through Activity 3, you will create an org chart using a restaurant as an example.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: " Team Dynamics",
                  activity: "People Management",
                  description:
                    "In this module, you will learn about creating a positive work culture and the importance of rituals and traditions. You will learn about flat structures vs hierarchies, flow and feedback, and avoiding abuse of power. Through Activity 4, you will create a ritual/tradition that you can introduce at work.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Leading your team",
                  activity: "People Management",
                  description:
                    "In this module, you will learn about the differences between bosses and leaders. You will learn about being honest, open, and willing to learn from everyone. You will also learn about taking accountability and the power of exemplary attitudes and empathy. Through Activity 5, you will write down five leadership traits you want to have.",
                  videoUrl: "",
                  duration: 1.46,
                },
                {
                  title: "Fostering Growth",
                  activity: "People Management",
                  description:
                    "In this module, you will learn about fostering growth within your team. You will learn about accepting criticism, empathy, communication channels, and helping your employees overcome challenges and build capacity. You will also learn about rewards and motivation strategies. Through an assignment, you will evaluate your current communication channels for reporting and identify areas for improvement.",
                  videoUrl: "",
                  duration: 1.46,
                },
              ],
            },
          },
        ],
      },
    },
  });
  // Instructor three
  //   await prisma.instructor.create({
  //     data: {
  //       instructor: "Daniel Choudry",
  //       shortDesc:
  //         "I make sure the participants easily understand my training programs and they take home easy learning.",
  //       desc: "Daniel is the Lead Trainer and Founding Director for Daniel Choudry Sales Institute, with 10 years experience in offering training about Sales and Customer Experience. He is also an author with 4 books about Sales and Customer Experience published. He has offered sales consultancy to over 20 companies in over 20 African countries. He has been recommended for training programs that meet industry requirements. As a coach, he guarantees a positive & valuable change in the participants’ behavior by the end of the training program.",
  //       image: "https://res.cloudinary.com/daecbszah/image/upload/v1677774376/coaches/daniel_ogzzb1.jpg",
  //       rating: "0",
  //       reviews: "0",
  //       students: "0",
  //       courses: "1",
  //       website: "",
  //       youtube: "",
  //       linkedin: "",
  //       course: {
  //         create: [
  //           {
  //             name: "Sales warriors",
  //             image: "/logo/Uketa Logo 10.jpg",
  //             shortDesc:
  //               "Access the self-paced short course that teaches you how to make amazing business and personal presentations",
  //             longDesc:
  //               "The Sales Warriors Course is fixed on ensuring that revenue comes to your business. Through its models, the course will teach you the techniques used by the best sales people in Africa and beyond, providing frameworks that you too can follow to get up there. The course is adapted to fit the current trends, so that you and your business can stand out and make good income in today’s very competitive market.",
  //             price: "UGX 180,000 | USD 47",
  //             rating: "5",
  //             ratingCount: "132",
  //             studentCount: "156",
  //             updateDate: "August 18 2021",
  //             introduction:
  //               "Learn the necessary tips, tricks, and strategies to make great speeches and presentations and represent your company or business with confidence.",
  //             moduleCount: "3 Modules",
  //             // tutor: "Daniel Choudry",
  //             // tutorImage: "/logo/Uketa Logo 10.jpg",
  //             previewVideo: null,
  //             lectures: {
  //               create: [
  //                 {
  //                   title: "The Sales Mindset",
  //                   activity: "Sales warriors",
  //                   description:
  //                     "Get off to a great start by understanding the minds of potential customers and developing the charisma and attitude of a great salesperson.",
  //                   videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
  //                   duration: 1.46,
  //                 },
  //                 {
  //                   title: "The Sales Competency Wheel/The Sales Process",
  //                   activity: "Sales warriors",
  //                   description:
  //                     "Explore the different time tested strategies that sales people employ. Learn the sales cycle in detail, understand the drivers of sales and interact with new models that will propel you to increased revenue.",
  //                   videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
  //                   duration: 1.46,
  //                 },
  //                 {
  //                   title: "The Sales Execution",
  //                   activity: "Sales warriors",
  //                   description:
  //                     "Equip yourself with the tactics needed to promote sales. Learn about conversion ratios, creating leads and lead management campaigns and utilising opportunities like phone calls and elevator pitches to make sales.",
  //                   videoUrl: "https://www.youtube.com/watch?v=F4Vk-cHllGE",
  //                   duration: 1.46,
  //                 },
  //               ],
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });