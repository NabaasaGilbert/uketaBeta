import prisma from "../prisma";

async function fetchData(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        courses: true,
        createdAt: true,
        dateOfBirth: true,
        gender: true,
        phone: true,
        company:true
      },
    });
    // const updatedUsers = users.map(elem => ({ ...elem, currentDate: new Date() }));

    const updatedUsers = users.map((elem) => {
      // Calculate age only if dateOfBirth is provided and not empty

      if (elem.dateOfBirth) {
        const dob = new Date(elem.dateOfBirth);
        const ageDiffMs = Date.now() - dob.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return { ...elem, currentDate: new Date(), age };
      } else {
        // If dateOfBirth is not provided or empty, return the original element
        return { ...elem, currentDate: new Date(), age: null };
      }
    });

    const CourseUserCount = [];
    const CourseNames = [];
    const CoursePrices = [];
    const Courses = await prisma.course.findMany({
      select: { id: true, name: true, priceUGX: true, courses: false },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });

    for (
      let courseIndex = 0;
      courseIndex < Object.values(Courses).length;
      courseIndex++
    ) {
      try {
        const courseCount = await prisma.CoursesOnUser.count({
          where: {
            courseId: Courses[courseIndex].id,
          },
        });
        CourseUserCount.push(courseCount);
        CourseNames.push(Courses[courseIndex].name);
        CoursePrices.push(Courses[courseIndex].priceUGX);
      } catch (e) {
        return;
      }
    }

    const payments = await prisma.payment.findMany({
      select: { amount: true, createdAt: true, status: true },
    });

    const discounts = await prisma.discount.findMany();

    res.send(
      JSON.stringify({
        userData: updatedUsers.reverse(),
        paymentData: payments,
        courseNames: CourseNames,
        studentCount: CourseUserCount,
        coursePrices: CoursePrices,
        discountCodes: discounts,
      })
    );
  } catch (error) {
    res.send(
      JSON.stringify({
        response: "Something went wrong on the Server",
        status: 500,
      })
    );
  }
}

export default fetchData;
