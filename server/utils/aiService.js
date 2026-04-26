/**
 * ResolveX AI Neural Service
 * Handles automated complaint analysis and classification
 */

const analyzeComplaint = (title, description) => {
    const text = (title + ' ' + description).toLowerCase();
    
    let category = 'General Inquiry';
    let priority = 'Medium';
    let suggestedFix = 'A system administrator will review this thread shortly.';

    // Neural Keywords Logic (Simulated AI Analysis)
    if (text.includes('internet') || text.includes('wifi') || text.includes('network')) {
        category = 'Network Connectivity';
        priority = text.includes('not working') ? 'High' : 'Medium';
        suggestedFix = 'Check physical gateway connections and reset the local DHCP lease.';
    } else if (text.includes('login') || text.includes('password') || text.includes('access')) {
        category = 'Access Management';
        priority = 'High';
        suggestedFix = 'Triggering credential reset protocol. Verify identity via multi-factor auth.';
    } else if (text.includes('slow') || text.includes('performance') || text.includes('lag')) {
        category = 'System Performance';
        priority = 'Low';
        suggestedFix = 'Optimize cache memory and check for background process leaks.';
    } else if (text.includes('critical') || text.includes('broken') || text.includes('crash')) {
        category = 'Hardware/System Failure';
        priority = 'Urgent';
        suggestedFix = 'Initiate immediate hardware diagnostic and failover to secondary node.';
    }

    return {
        category,
        priority,
        suggestedFix
    };
};

module.exports = { analyzeComplaint };
