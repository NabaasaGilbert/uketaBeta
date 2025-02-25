import prisma from '../prisma';

async function publishCourse(req, res) {
  const data = await req.body;

  try {

    const updateCourse = await prisma.course.update({
      where: { id: data.courseId },
      data: { isPublished: true },
    });

    res.send(
      JSON.stringify({
        status: 200,
        data: updateCourse,
        error: null,
        response: 'Course updated successfully.',
      })
    );
    
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: 'In updating course ' + e,
        response: 'Error updating new course.',
      })
    );
  }
}

export default publishCourse;
