/**
 * PSA @ University of Miami — E-Board Application Form generator
 * ---------------------------------------------------------------
 * Creates a Google Form with role-based branching for three open seats:
 * Vice President, PR Chair, Events Coordinator.
 *
 * HOW TO RUN
 *   1. Go to https://script.google.com  ->  New project
 *   2. Delete the placeholder code, paste this whole file in
 *   3. Save, then press Run (select the `createPSAApplicationForm` function)
 *   4. Approve the permission prompt (Google asks to manage your forms — this
 *      is Google's own dialog; it does not go through anyone else)
 *   5. The Execution log prints the live form link and the edit link
 *
 * The form and its response spreadsheet are created in YOUR Drive, owned by you.
 * Re-running makes a brand new form; it never overwrites the previous one.
 */

function createPSAApplicationForm() {
  var YEAR = "2026–27";

  // ---------------------------------------------------------------- form shell
  var form = FormApp.create("PSA E-Board Application " + YEAR);

  form.setTitle("PSA E-Board Application — " + YEAR)
      .setDescription(
        "Pakistani Students Association at the University of Miami\n\n" +
        "We have three seats open: Vice President, PR Chair, and Events Coordinator.\n\n" +
        "You will answer a short set of questions about yourself, then a set specific " +
        "to the role you pick. Expect it to take 15–20 minutes. There are no trick " +
        "questions and no right answers — we are trying to understand how you think " +
        "and what you would actually do in the job.\n\n" +
        "Board members serve a one-year term, meet every two weeks, and are responsible " +
        "for 2–3 major cultural events per semester. Questions: hxs1101@miami.edu"
      );

  form.setCollectEmail(true)
      .setProgressBar(true)
      .setAllowResponseEdits(false)
      .setLimitOneResponsePerUser(false)   // lets one person apply for a second role
      .setShowLinkToRespondAgain(false)
      .setConfirmationMessage(
        "Thanks for applying — we have got it.\n\n" +
        "The board reviews applications on a rolling basis and will email you from a " +
        "@miami.edu address about next steps, usually a short conversation with two " +
        "current board members.\n\n" +
        "If you want to be considered for a second role, submit the form again and " +
        "pick the other position."
      );

  // ============================================================ SECTION 1: you
  form.addSectionHeaderItem()
      .setTitle("About you")
      .setHelpText("Basics first. This section is the same for every role.");

  var umEmail = FormApp.createTextValidation()
      .setHelpText("Please use your University of Miami email (ends in miami.edu).")
      .requireTextMatchesPattern("^[^@\\s]+@([a-zA-Z0-9-]+\\.)*miami\\.edu$")
      .build();

  form.addTextItem().setTitle("Full name").setRequired(true);

  form.addTextItem()
      .setTitle("UM email address")
      .setHelpText("Your @miami.edu address — this is where we will reply.")
      .setValidation(umEmail)
      .setRequired(true);

  form.addTextItem()
      .setTitle("Phone number")
      .setHelpText("For the group chat and day-of-event coordination.")
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Expected graduation")
      .setChoiceValues(["Spring 2027", "Spring 2028", "Spring 2029", "Spring 2030",
                        "Graduate student", "Other"])
      .showOtherOption(true)
      .setRequired(true);

  form.addTextItem().setTitle("Major(s) and minor(s)").setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Are you enrolled full-time and in good academic standing?")
      .setHelpText("PSA's constitution requires this for board eligibility: 12 credits " +
                   "for undergraduates, 9 for graduate students.")
      .setChoiceValues(["Yes", "No", "Not sure — happy to check"])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("How long have you been involved with PSA?")
      .setHelpText("Be honest — newer members do get elected, and we would rather " +
                   "know where you are starting from.")
      .setChoiceValues(["This will be my first semester", "About one semester",
                        "Two semesters", "Three or more semesters",
                        "I have not been involved yet, but I want to be"])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Roughly how many PSA events have you been to?")
      .setChoiceValues(["None yet", "1–2", "3–5", "6 or more"])
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Any leadership roles you have held before?")
      .setHelpText("UM orgs, school, work, volunteering, anything. Write \"none\" if " +
                   "this would be your first — that is genuinely fine.")
      .setRequired(true);

  // Branching question — MUST be the last item in this section.
  var roleQuestion = form.addMultipleChoiceItem()
      .setTitle("Which position are you applying for?")
      .setHelpText("Pick one. The next section changes based on your answer. To apply " +
                   "for a second role, submit this form again afterwards.")
      .setRequired(true);

  // ==================================================== SECTION 2: Vice President
  var vpPage = form.addPageBreakItem()
      .setTitle("Vice President")
      .setHelpText(
        "The VP assists the President across all duties, works with every board " +
        "member, keeps attendance and minutes, and — per the constitution — must be " +
        "ready to step into the Presidency at any point."
      );

  form.addParagraphTextItem()
      .setTitle("The VP has to be able to take over as President without warning. " +
                "What would you need to learn to do that, and how would you get up to speed?")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Tell us about a time you kept something on track after people stopped " +
                "replying. What did you actually do, step by step?")
      .setHelpText("Specifics beat principles here. We want the actions, not the philosophy.")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("The VP keeps the attendance roster. That roster decides who counts as " +
                "an \"active member\" — 50% event attendance — and therefore who can vote " +
                "and run for board. How would you track it reliably all semester?")
      .setHelpText("This is the least glamorous part of the job and the one that breaks " +
                   "most often. We are looking for a real system.")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Two board members disagree about spending a limited budget, and it is " +
                "starting to feel personal. You are the VP. What are your next three moves?")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Last year PSA ran a Spring GBM with Tambola and a Mock Shaadi senior " +
                "send-off with the Indian Students Association. Looking at that, what " +
                "would you keep, cut, or add — and why?")
      .setHelpText("The constitution commits the board to 2–3 major events per semester.")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("What is the hardest thing about running a cultural org on a campus " +
                "where the Pakistani student population is small?")
      .setHelpText("Open-ended on purpose. We want to hear you think.")
      .setRequired(true);

  // ========================================================= SECTION 3: PR Chair
  var prPage = form.addPageBreakItem()
      .setTitle("PR Chair")
      .setHelpText(
        "The PR Chair runs @psa.umiami, makes the graphics, and is the reason people " +
        "know an event is happening. This section leans on your taste and your turnaround."
      );

  form.addParagraphTextItem()
      .setTitle("Show us work you have made. Paste links — accounts you have run, " +
                "flyers, reels, photos, a portfolio, anything.")
      .setHelpText("If your best work is not linkable, describe it and we will ask to see it.")
      .setRequired(true);

  form.addCheckboxItem()
      .setTitle("Which tools do you actually use?")
      .setChoiceValues(["Canva", "Figma", "Adobe Photoshop", "Adobe Illustrator",
                        "Adobe Lightroom", "CapCut", "Premiere Pro or Final Cut",
                        "Instagram / in-app editing only", "A camera (not just a phone)"])
      .showOtherOption(true)
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Pitch three posts you would put on @psa.umiami in your first month. " +
                "Be specific about format — reel, carousel, story, photo dump.")
      .setHelpText("This is the question we weigh most heavily.")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("An event is in 48 hours and turnout is looking thin. What do you post, " +
                "where do you post it, and who do you ask for help?")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("PSA's biggest events are collaborations — with the Indian Students " +
                "Association, Muslim Students of UM, the Arab Students Union. How do you " +
                "handle promo when both orgs want their branding front and center?")
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Once you have the event details, how fast can you realistically turn " +
                "around a finished flyer?")
      .setChoiceValues(["Same day", "1–2 days", "3–4 days", "About a week"])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("How do you feel about being on camera — stories, lives, hosting?")
      .setChoiceValues(["Comfortable on camera", "I would rather stay behind the camera",
                        "Either works"])
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("PSA has a visual identity already — the Sebastian-on-the-crescent crest, " +
                "green and orange, truck-art influences. Would you build on it or change " +
                "direction? Make the case.")
      .setRequired(true);

  // ================================================ SECTION 4: Events Coordinator
  var ecPage = form.addPageBreakItem()
      .setTitle("Events Coordinator")
      .setHelpText(
        "The Events Coordinator makes events physically happen — space bookings, food, " +
        "budget, timeline, and the fire drills two hours before doors open."
      );

  form.addParagraphTextItem()
      .setTitle("Pitch one event you want PSA to run next semester. What is it, where on " +
                "campus, roughly what does it cost, and why would 60 people show up?")
      .setHelpText("Rough numbers are fine. We want to see you think about cost and turnout " +
                   "at the same time.")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Take a 100-person event and work backwards from the date. What is your " +
                "timeline, and what has to happen first?")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Booking campus space — the Shalala ballrooms, the Rathskeller, Foote " +
                "Green — and getting funding through COSO and SAFAC means paperwork and " +
                "hard deadlines. What is your experience, and how would you get fluent fast?")
      .setHelpText("No experience is an acceptable answer if you tell us how you would learn.")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Two hours before doors: the caterer is late and the AV in the room does " +
                "not work. What do you do first?")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Desi food for a campus event on a student budget. How do you source it, " +
                "and how do you make sure halal and dietary needs are actually covered?")
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Have you organized something before — an org event, a fundraiser, a " +
                "wedding, a school function? Tell us about the messiest part and what you " +
                "did about it.")
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Do you have access to a car for supply runs?")
      .setChoiceValues(["Yes, my own", "Yes, sometimes — borrowed or shared", "No"])
      .setRequired(true);

  // ================================================= SECTION 5: everyone (closing)
  var closingPage = form.addPageBreakItem()
      .setTitle("Last few questions")
      .setHelpText("Same for everyone. Almost done.");

  form.addParagraphTextItem()
      .setTitle("Why PSA, and why now?")
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Realistically, how many hours a week can you give PSA?")
      .setHelpText("We would much rather know the true number than the impressive one.")
      .setChoiceValues(["Under 2", "2–4", "4–6", "6 or more"])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle("Can you commit to board meetings every two weeks for the full academic year?")
      .setChoiceValues(["Yes", "Mostly — with some conflicts I will flag", "No"])
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle("Anything coming up that would pull you away for a stretch of the semester?")
      .setHelpText("Study abroad, heavy clinical or lab terms, a job, sports, family travel. " +
                   "This does not count against you — it helps us plan.")
      .setRequired(false);

  form.addCheckboxItem()
      .setTitle("If we cannot offer you your first-choice role, would you consider another?")
      .setChoiceValues(["Vice President", "PR Chair", "Events Coordinator",
                        "No thanks — only the role I applied for"])
      .setRequired(true);

  form.addTextItem()
      .setTitle("Someone who can speak to your work")
      .setHelpText("A current PSA member, another org's board member, a professor — name " +
                   "and email. Optional.")
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle("Anything else we should know?")
      .setRequired(false);

  form.addMultipleChoiceItem()
      .setTitle("How did you hear about these openings?")
      .setChoiceValues(["Instagram", "GroupMe", "psaumiami.com", "A PSA board member",
                        "A friend", "Engage", "Other"])
      .showOtherOption(true)
      .setRequired(false);

  // ------------------------------------------------------------------- branching
  // Role choice jumps straight to that role's section.
  roleQuestion.setChoices([
    roleQuestion.createChoice("Vice President",     vpPage),
    roleQuestion.createChoice("PR Chair",           prPage),
    roleQuestion.createChoice("Events Coordinator", ecPage)
  ]);

  // After each role section, skip the other two and land on the closing section.
  vpPage.setGoToPage(closingPage);
  prPage.setGoToPage(closingPage);
  ecPage.setGoToPage(closingPage);

  // ------------------------------------------- responses -> linked Google Sheet
  var ss = SpreadsheetApp.create("PSA E-Board Applications " + YEAR + " — Responses");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ------------------------------------------------------------------- log links
  var out = [
    "",
    "=========================================================",
    "  PSA E-Board Application form created",
    "=========================================================",
    "  Share this link with applicants:",
    "    " + form.getPublishedUrl(),
    "",
    "  Edit the form:",
    "    " + form.getEditUrl(),
    "",
    "  Responses spreadsheet:",
    "    " + ss.getUrl(),
    "========================================================="
  ].join("\n");
  Logger.log(out);
  return out;
}
