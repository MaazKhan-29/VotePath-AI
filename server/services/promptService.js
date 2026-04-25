// Prompt templates for all AI interactions
// Rules: Simple, step-by-step, actionable, no political bias, ECI-based

const SYSTEM_PROMPT = `You are VotePath AI, a friendly and helpful election assistant for Indian voters.

STRICT RULES:
1. Always be neutral - NEVER mention any political party, candidate, or political ideology.
2. Base all information on the Election Commission of India (ECI) official processes.
3. Give step-by-step, actionable guidance that a beginner can follow.
4. Use simple language. You can use Hinglish (mix of Hindi and English) when appropriate.
5. Always end with "What should you do next?" followed by a clear next action.
6. Be encouraging and supportive about civic participation.
7. Focus on WHAT the user should DO, not just information.
8. Keep responses concise but complete.`;

const prompts = {
  journey: (user) => ({
    system: SYSTEM_PROMPT,
    prompt: `Generate a personalized voting journey for this Indian voter:
- Name: ${user.name}
- Age: ${user.age}
- State: ${user.state}
- Voter Registration Status: ${user.voterStatus}
- Has Voter ID: ${user.hasVoterId}
- First Time Voter: ${user.isFirstTimeVoter}
- Pincode: ${user.pincode || 'Not provided'}

Create a step-by-step journey with exactly 5-7 steps. For each step include:
1. Step number and title
2. What to do (2-3 clear sentences)
3. Important link or resource (use official ECI links)
4. Estimated time to complete

Format your response as JSON:
{
  "steps": [
    {
      "number": 1,
      "title": "Step Title",
      "description": "What to do",
      "resource": "https://...",
      "estimatedTime": "10 minutes",
      "completed": false
    }
  ],
  "summary": "One line summary of the journey",
  "nextAction": "What the user should do right now"
}`,
  }),

  readiness: (user, checklist) => ({
    system: SYSTEM_PROMPT,
    prompt: `Calculate the voting readiness score for this Indian voter:

Voter Profile:
- Age: ${user.age}
- State: ${user.state}
- Voter Status: ${user.voterStatus}
- Has Voter ID: ${user.hasVoterId}
- First Time Voter: ${user.isFirstTimeVoter}

Checklist Status:
${checklist.map(item => `- ${item.label}: ${item.completed ? '✅ Done' : '❌ Not done'}`).join('\n')}

Calculate a readiness score from 0-100 and provide breakdown.

Format your response as JSON:
{
  "score": 75,
  "breakdown": {
    "registration": { "score": 25, "max": 30, "status": "Complete" },
    "documents": { "score": 20, "max": 25, "status": "Need Voter ID" },
    "awareness": { "score": 15, "max": 25, "status": "Good" },
    "preparation": { "score": 15, "max": 20, "status": "Find your booth" }
  },
  "tips": ["Tip 1", "Tip 2"],
  "nextAction": "What the user should do to increase their score"
}`,
  }),

  chat: (message, user, chatHistory = []) => ({
    system: `${SYSTEM_PROMPT}

You are chatting with a voter from ${user.state}, age ${user.age}.
Voter status: ${user.voterStatus}. Has voter ID: ${user.hasVoterId}.

Previous conversation:
${chatHistory.slice(-6).map(m => `${m.role}: ${m.content}`).join('\n')}

Respond in a conversational, friendly tone. Use Hinglish if the user writes in Hindi/Hinglish.
Keep responses under 200 words. Always end with a helpful next step.`,
    prompt: message,
  }),

  scenario: (scenarioType, user) => ({
    system: SYSTEM_PROMPT,
    prompt: `Simulate this voter scenario and provide a step-by-step solution:

Scenario: ${scenarioType}
Voter: ${user.name}, Age ${user.age}, from ${user.state}

Common scenarios and what to address:
- "first_time_voter": Complete guide for someone voting for the first time
- "lost_voter_id": How to get a duplicate/replacement voter ID
- "name_mismatch": How to correct name in voter rolls
- "shifted_residence": How to transfer voter registration
- "missed_registration": What to do if registration deadline passed
- "no_documents": Alternative ways to prove identity at booth

Provide a detailed solution flow with:
1. Problem description
2. Step-by-step solution (5-8 steps)
3. Documents needed
4. Official websites/contacts
5. Expected timeline

Format as JSON:
{
  "scenario": "${scenarioType}",
  "title": "Scenario Title",
  "description": "Brief problem description",
  "steps": [
    {
      "number": 1,
      "action": "What to do",
      "details": "More details",
      "link": "https://..."
    }
  ],
  "documentsNeeded": ["Doc 1", "Doc 2"],
  "estimatedTime": "3-5 days",
  "helplineNumber": "1950",
  "nextAction": "Immediate next step"
}`,
  }),

  booth: (pincode, area, user) => ({
    system: SYSTEM_PROMPT,
    prompt: `Provide polling booth guidance for an Indian voter:

Area/Pincode: ${pincode || area || 'Not specified'}
State: ${user.state}
Voter Status: ${user.voterStatus}

Provide:
1. How to find exact booth location (step-by-step)
2. What happens at the polling booth (the voting process)
3. What to carry on voting day
4. DOs and DON'Ts at the booth
5. Timing and queue management tips

Format as JSON:
{
  "howToFind": {
    "steps": ["Step 1...", "Step 2..."],
    "officialLink": "https://electoralsearch.eci.gov.in/"
  },
  "boothProcess": [
    { "step": 1, "description": "Arrival and queue" },
    { "step": 2, "description": "Identity verification" },
    { "step": 3, "description": "Ink marking" },
    { "step": 4, "description": "Voting on EVM" },
    { "step": 5, "description": "VVPAT verification" },
    { "step": 6, "description": "Exit" }
  ],
  "whatToCarry": ["Voter ID (EPIC)", "Additional photo ID"],
  "dos": ["Do arrive early", "Do check your name in voter list"],
  "donts": ["Don't carry mobile phone inside", "Don't take photos of ballot"],
  "timing": "Usually 7 AM to 6 PM (varies by state)",
  "nextAction": "Check your booth location now"
}`,
  }),

  quiz: () => ({
    system: SYSTEM_PROMPT,
    prompt: `Generate 10 multiple-choice questions about Indian elections and voting process.

Topics to cover:
- Voter eligibility and registration
- Election Commission of India
- Voting process at booth
- EVM and VVPAT
- Voter rights and responsibilities
- Important election terms
- Constitutional provisions about elections

Each question should be educational and help voters learn about the process.

Format as JSON:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Brief explanation of the correct answer"
    }
  ]
}`,
  }),

  timeline: (user) => ({
    system: SYSTEM_PROMPT,
    prompt: `Generate a personalized voting timeline for this Indian voter:

- Age: ${user.age}
- State: ${user.state}
- Voter Status: ${user.voterStatus}
- Has Voter ID: ${user.hasVoterId}
- First Time Voter: ${user.isFirstTimeVoter}

Create a timeline with important dates and deadlines. Since election dates vary, provide general guidance with relative deadlines.

Format as JSON:
{
  "events": [
    {
      "id": 1,
      "title": "Event Title",
      "description": "What happens and what to do",
      "deadline": "Description of when (e.g., '30 days before election')",
      "daysFromNow": 30,
      "priority": "high",
      "completed": false
    }
  ],
  "nextElectionInfo": "General information about upcoming elections",
  "nextAction": "What to do right now"
}`,
  }),
};

module.exports = prompts;
