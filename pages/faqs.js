import CoursesPaidEl from '../components/coursepage/CoursesPaidEl';
import Head from 'next/head';

export default function mycourses() {
  return (
    <>
      <Head>
        <title>FAQs | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="FAQs | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Select from courses taught by real-world experts, learn in-demand skills with professional video courses at your own pace, with lifetime access on mobile and desktop on Uketa an online learning and teaching platform from Uganda with courses ranging in multiple topics and skill levels from expert coaches"
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/courses" />
        <meta name="robots" content="all" />
      </Head>
      <div className="mt-5">.</div>
      <p className="sectionHeader text-center mt-5">
        Frequently Asked Questions
      </p>
      <div className="container my-5">
        <div className="p-2 my-2">
          <h4 className="text-muted">
            Are the courses on UKETA Learning accredited?
          </h4>
          <p className="">
            Yes, the courses on UKETA Learning are accredited by Ibanda
            University and you get a certification on completion.
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted">How much do courses on UKETA cost?</h4>
          <p className="">
            The courses on UKETA Learning range from as low as 80,000 to 250,000
            ugx. You get lifetime access once you purchase a course.
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted">
            How can I enroll in a course on UKETA Learning?
          </h4>
          <p className="">
            To enroll in a course on UKETA Learning, you can visit the website
            and create a free account, you can then select your prefered course
            and Add to Cart.
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted"> How can I pay for a course?</h4>
          <p className="">
            You can use Mobile Money or your Debit Cards to pay for a course.
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted">
            {' '}
            Are there any prerequisites for taking courses on UKETA Learning?
          </h4>
          <p className="">
            No, the courses are assumed to be from a starting or amateur level.
            So, in this case the courses are tailored to start the journey of
            the desired skill after completing the course.
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted"> When does the course start?</h4>
          <p className="">
            You get access to the course as soon as you purchase it, you can
            start and take the course in your own time at your own pace.
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted">
            {' '}
            How long do I have access to the course materials after completing a
            course on UKETA Learning?
          </h4>
          <p className="">
            After completing a course on UKETA Learning, you will have access to
            the course materials for the rest of your life!
          </p>
        </div>
        <div className="p-2 my-2">
          <h4 className="text-muted">
            {' '}
            How can I contact UKETA Learning if I have questions or concerns?
          </h4>
          <p className="">
            You can contact UKETA Learning by email at <a href="mailto:info@uketalearning.com" className="text-orange">info@uketalearning.com</a>  or
            by phone at <a href="tel:+256 776 906 319" className="text-orange">+256 776 906 319</a>. You can also use the contact form on the
            website.
          </p>
        </div>
      </div>
    </>
  );
}
