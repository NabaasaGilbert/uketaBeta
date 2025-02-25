import moment from "moment";
import prisma from "../prisma";
import playwright from "playwright-core";
import chromium from "@sparticuz/chromium"; // This replaces chrome-aws-lambda

async function getCertificate(req, res) {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true, // Ensure this is a boolean
    };
  } else {
    options = {
      headless: true, // Ensure this is a boolean
    };
  }

  try {
    const data = await req.body;

    const certificate = await prisma.courseProgress.findUnique({
      where: { id: data.id },
      include: {
        Course: {
          include: {
            Instructor: true, // To include the related Instructor data inside the Course
          },
        }, // To include the related Course data
        User: {
          include: {
            company: true, // To include the related Instructor data inside the Course
          },
        },
      },
    });

    // Generate the HTML content
    const htmlContent = `
      <html>
      <head>
        <style>
          *{
              font-family: "Montserrat", sans-serif !important;
          }
          .mx-auto {
              margin-right: auto !important;
              margin-left: auto !important;
          }
          .position-relative {
              position: relative !important;
          }
          *, ::after, ::before {
              box-sizing: border-box;
          }
          .certificate {
              height: 980px;
              width: 1300px;
          }
          .w-100 {
              width: 100% !important;
          }
          .position-absolute {
              position: absolute !important;
          }
          .text-center {
            text-align: center;
          }
          .d-flex {
            display: flex;
          }
          .justify-content-between {
            justify-content: space-between;
          }
          .text-orange {
            color: orange;
          }
          .justify-content-end {
              justify-content: flex-end !important;
          }
          .py-5 {
              padding-top: 3rem !important;
              padding-bottom: 3rem !important;
          }
          .d-flex {
              display: flex !important;
          }
          .certificate-text-id {
              font-size: 16px;
              font-weight: 500;
              padding-top: 110px;
              padding-right: 17px
          }
          .certificate-name {
              padding-top: 290px;
              font-size: 40px;
          }
          .certificate-text {
              padding-top: 30px;
              font-size: 25px;
              line-height: 30px;
          } 
          img, svg {
              vertical-align: middle;
          }
          .h4, h4 {
              font-size: 1.3rem;
          }
          .fw-bold {
              font-weight: 700 !important;
          }
          h4,h5{
              margin:0px;
          }          
          .coach-signature-details {
              margin: -30px 0px 0px 350px;
          }
          .prof-signature-details {
              margin-right: -10px;
          }
          .class-of-text{
            width: 350px;
            font-weight: 700;
            font-size: 28px;
            margin: 20px 0px 0px -0px;
            padding: 0px 0px 0px 60px
          }
          .company-logo-container{
            position:relative
          }
          .company-logo{
            position: absolute;
            left:140px
          }
        </style>
      </head>
      <body>
        <div class="mx-auto position-relative">
                  <div class="position-absolute w-100">
                    <div class="d-flex justify-content-end text-orange certificate-text-id">
                      <p>${certificate.id}</p>
                    </div>
                    <div class="company-logo-container">
                        <img
                          src=${certificate?.User?.company?.logo}
                          width="150"
                          class="company-logo"
                        />
                    </div>

                    <div class="certificate-name w-100 text-center">
                      <p class="text-center">${certificate.User.name}</p>
                    </div>
                    <div class="certificate-text w-100 text-center">
                      <div>For Completing the the Uketa Learning</div>
                      <div> ${certificate.Course.name} </div>
                      <div>on ${moment(certificate.updatedAt).format(
                        "LL"
                      )}</div>
                    </div>
                    <div class="d-flex py-5 justify-content-between">
                      <div class="coach-signature-details">
                        <img
                          src=${certificate?.Course?.Instructor?.signature}
                          width="150"
                          class="coach-img-signature"
                        />
                        <div class="py-4 text-center">
                          <h4 class="fw-bold">
                            ${certificate?.Course?.Instructor?.instructor}
                          </h4>
                          <h5>Uketa Coach</h5>
                        </div>
                      </div>

                      <div class="prof-signature-details">
                        <img
                          src="https://res.cloudinary.com/daecbszah/image/upload/v1695625955/uketa/Prof._Samson_James_Opolot_basrnt.png"
                          width="150"
                          class="coach-img-signature"
                        />
                      </div>
                      <span class="class-of-text">Class of ${moment(
                        certificate.updatedAt
                      ).year()}</span>
                    </div>
                    
                  </div>
                  <img
                    src="https://uketa-app.vercel.app/defaults/certificate.png"
                    class="certificate"
                    id="certificate"
                    width="150"
                  />
                </div>
      </body>
      </html>
    `;

    const browser = await playwright.chromium.launch(options);

    const page = await browser.newPage();

    // Set screen size.
    const A4Width = 350 * 3.779528; // 297mm to pixels
    const A4Height = 220 * 3.779528; // 210mm to pixels
    await page.setViewportSize({
      width: Math.round(A4Width),
      height: Math.round(A4Height),
    });

    // Load the HTML content
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Wait a little longer for all fonts and resources to load
    await page.waitForTimeout(3000);

    // Generate the screenshot
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    await browser.close();

    // Send the screenshot as a response
    res.setHeader(
      "Content-disposition",
      "attachment; filename=certificate.png"
    );
    res.setHeader("Content-type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    res.status(500).json({
      error,
      status: 500,
    });
  }
}

export default getCertificate;
