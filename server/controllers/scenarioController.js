const User = require('../models/User');
const aiService = require('../services/aiService');
const prompts = require('../services/promptService');
const { asyncHandler } = require('../middleware/errorHandler');

const runScenario = asyncHandler(async (req, res) => {
  const { userId, scenarioType } = req.body;
  if (!userId || !scenarioType) {
    return res.status(400).json({ success: false, error: 'userId and scenarioType are required.' });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });

  const { system, prompt } = prompts.scenario(scenarioType, user);
  const result = await aiService.generate(prompt, system);

  let scenarioData;
  try {
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    scenarioData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (e) { scenarioData = null; }

  if (!scenarioData) {
    const scenarios = {
      first_time_voter: {
        scenario: 'first_time_voter', title: 'First-Time Voter Guide',
        description: 'Complete guide for someone voting for the first time in India.',
        steps: [
          { number: 1, action: 'Check Eligibility', details: 'Must be 18+ Indian citizen', link: 'https://voters.eci.gov.in/' },
          { number: 2, action: 'Register Online', details: 'Fill Form 6 on NVSP portal', link: 'https://voters.eci.gov.in/' },
          { number: 3, action: 'Submit Documents', details: 'Upload photo, age proof, address proof', link: '' },
          { number: 4, action: 'Get Voter ID', details: 'Download e-EPIC after approval', link: 'https://voters.eci.gov.in/' },
          { number: 5, action: 'Find Your Booth', details: 'Search at Electoral Search portal', link: 'https://electoralsearch.eci.gov.in/' },
          { number: 6, action: 'Vote on Election Day', details: 'Carry Voter ID, reach booth early', link: '' },
        ],
        documentsNeeded: ['Passport photo', 'Aadhaar Card', 'Age proof (birth certificate/10th marksheet)'],
        estimatedTime: '15-30 days', helplineNumber: '1950', nextAction: 'Start registration at voters.eci.gov.in'
      },
      lost_voter_id: {
        scenario: 'lost_voter_id', title: 'Lost Voter ID — Get a Replacement',
        description: 'How to get a duplicate Voter ID card if yours is lost or damaged.',
        steps: [
          { number: 1, action: 'File an FIR (optional)', details: 'Report the loss at your local police station', link: '' },
          { number: 2, action: 'Visit NVSP Portal', details: 'Go to voters.eci.gov.in', link: 'https://voters.eci.gov.in/' },
          { number: 3, action: 'Fill Form 001', details: 'Application for duplicate EPIC', link: '' },
          { number: 4, action: 'Submit with Declaration', details: 'Declare the loss and attach FIR copy if available', link: '' },
          { number: 5, action: 'Download e-EPIC', details: 'Get digital copy immediately after verification', link: 'https://voters.eci.gov.in/' },
        ],
        documentsNeeded: ['FIR copy (if filed)', 'Aadhaar Card', 'Passport photo'],
        estimatedTime: '7-15 days', helplineNumber: '1950', nextAction: 'Visit voters.eci.gov.in and apply for duplicate'
      },
      name_mismatch: {
        scenario: 'name_mismatch', title: 'Name Mismatch in Voter Records',
        description: 'How to correct your name in the electoral roll.',
        steps: [
          { number: 1, action: 'Visit NVSP Portal', details: 'Go to voters.eci.gov.in', link: 'https://voters.eci.gov.in/' },
          { number: 2, action: 'Fill Form 8', details: 'Correction of entries in electoral roll', link: '' },
          { number: 3, action: 'Upload Proof', details: 'Attach ID showing correct name', link: '' },
          { number: 4, action: 'Submit & Track', details: 'Note reference number and track status', link: '' },
        ],
        documentsNeeded: ['Aadhaar Card', 'PAN Card', 'Passport', 'Any ID with correct name'],
        estimatedTime: '15-30 days', helplineNumber: '1950', nextAction: 'Fill Form 8 on NVSP portal'
      },
    };
    scenarioData = scenarios[scenarioType] || scenarios.first_time_voter;
  }

  res.json({ success: true, data: scenarioData, provider: result.provider, cached: result.cached });
});

const getScenarios = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'first_time_voter', title: 'First-Time Voter', icon: '🗳️', description: 'Complete guide for your first election' },
      { id: 'lost_voter_id', title: 'Lost Voter ID', icon: '🔍', description: 'Get a replacement Voter ID card' },
      { id: 'name_mismatch', title: 'Name Mismatch', icon: '✏️', description: 'Correct your name in voter records' },
      { id: 'shifted_residence', title: 'Shifted Residence', icon: '🏠', description: 'Transfer your voter registration' },
      { id: 'missed_registration', title: 'Missed Registration', icon: '⏰', description: 'What if deadline has passed' },
      { id: 'no_documents', title: 'No Documents', icon: '📄', description: 'Vote without standard documents' },
    ],
  });
});

module.exports = { runScenario, getScenarios };
