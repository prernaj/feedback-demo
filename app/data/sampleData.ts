export interface NPSResponse {
  id: string;
  score: number;
  comment: string;
  date: string;
  product: string;
  segment: string;
}

export interface CSATResponse {
  id: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  channel: string;
}

export interface AppReview {
  id: string;
  platform: "iOS" | "Android";
  rating: number;
  title: string;
  body: string;
  date: string;
  version: string;
}

export interface Complaint {
  id: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  subject: string;
  description: string;
  date: string;
  status: "open" | "in_progress" | "resolved";
  resolution?: string;
}

export interface CallTranscript {
  id: string;
  date: string;
  duration: string;
  sentiment: "positive" | "neutral" | "negative";
  topic: string;
  excerpt: string;
}

export interface ChatLog {
  id: string;
  date: string;
  topic: string;
  sentiment: "positive" | "neutral" | "negative";
  messages: { role: "customer" | "agent"; text: string }[];
  csat?: number;
}

export const npsData: NPSResponse[] = [
  { id: "nps-001", score: 9, comment: "The mobile app redesign is fantastic — checkout is 3 taps now instead of 8.", date: "2024-06-01", product: "Mobile App", segment: "Power User" },
  { id: "nps-002", score: 2, comment: "Shipping took 3 weeks for a Prime member. Customer support just sent copy-paste responses.", date: "2024-06-02", product: "E-commerce", segment: "Prime" },
  { id: "nps-003", score: 8, comment: "Great product selection. Wish the search filters were more granular — can't filter by brand and size simultaneously.", date: "2024-06-03", product: "E-commerce", segment: "Regular" },
  { id: "nps-004", score: 1, comment: "My account was compromised and it took 5 days to resolve. Completely unacceptable security response time.", date: "2024-06-04", product: "Account Security", segment: "Business" },
  { id: "nps-005", score: 10, comment: "Best returns experience I've ever had. Picked up from my door same day!", date: "2024-06-05", product: "Returns", segment: "Prime" },
  { id: "nps-006", score: 7, comment: "App is good but crashes when I try to add more than 10 items to wishlist on iOS 17.", date: "2024-06-05", product: "Mobile App", segment: "Regular" },
  { id: "nps-007", score: 5, comment: "Middle of the road. Good prices but checkout process needs saved payment methods to work better.", date: "2024-06-06", product: "E-commerce", segment: "Regular" },
  { id: "nps-008", score: 9, comment: "Subscription box is amazing — always discover new products. Great curation.", date: "2024-06-07", product: "Subscription", segment: "Power User" },
  { id: "nps-009", score: 3, comment: "Charged twice for same order. Still waiting for second refund after 10 days.", date: "2024-06-07", product: "Billing", segment: "Regular" },
  { id: "nps-010", score: 8, comment: "Customer service rep Sarah was incredibly helpful resolving my damaged delivery.", date: "2024-06-08", product: "Customer Support", segment: "Prime" },
  { id: "nps-011", score: 10, comment: "Same-day delivery works flawlessly in our city now. Life-changing for last-minute gifts.", date: "2024-06-08", product: "Delivery", segment: "Prime" },
  { id: "nps-012", score: 4, comment: "Product photos don't match what you receive. Third time this happened — losing trust.", date: "2024-06-09", product: "E-commerce", segment: "Regular" },
  { id: "nps-013", score: 9, comment: "API integration for our business account is solid. Reduced our procurement time by 60%.", date: "2024-06-09", product: "Business API", segment: "Business" },
  { id: "nps-014", score: 6, comment: "Fine experience overall. Nothing exceptional, nothing terrible. Would use again but wouldn't rave about it.", date: "2024-06-10", product: "E-commerce", segment: "Regular" },
  { id: "nps-015", score: 2, comment: "Subscription renewal charged without notice. No email, no reminder. Just saw it on my statement.", date: "2024-06-10", product: "Subscription", segment: "Regular" },
];

export const csatData: CSATResponse[] = [
  { id: "csat-001", rating: 5, category: "Delivery", comment: "Arrived in perfect condition, exactly on time.", date: "2024-06-01", channel: "Web" },
  { id: "csat-002", rating: 2, category: "Support", comment: "Waited 45 minutes on hold only to be transferred twice.", date: "2024-06-01", channel: "Phone" },
  { id: "csat-003", rating: 4, category: "Product Quality", comment: "Very happy with the quality. Small issue with packaging.", date: "2024-06-02", channel: "Mobile" },
  { id: "csat-004", rating: 1, category: "Billing", comment: "Charged wrong amount. Still unresolved after 2 contacts.", date: "2024-06-02", channel: "Chat" },
  { id: "csat-005", rating: 5, category: "Returns", comment: "Easiest return process ever. Instant refund!", date: "2024-06-03", channel: "Mobile" },
  { id: "csat-006", rating: 3, category: "Support", comment: "Issue resolved eventually but took longer than expected.", date: "2024-06-03", channel: "Email" },
  { id: "csat-007", rating: 5, category: "Delivery", comment: "Driver called ahead. Left in safe spot as requested.", date: "2024-06-04", channel: "Web" },
  { id: "csat-008", rating: 2, category: "Product Quality", comment: "Opened box and item was already used. Disgusting.", date: "2024-06-04", channel: "Mobile" },
  { id: "csat-009", rating: 4, category: "Support", comment: "Rep was knowledgeable and friendly. Slight wait time.", date: "2024-06-05", channel: "Chat" },
  { id: "csat-010", rating: 5, category: "Checkout", comment: "One-click purchase worked perfectly. Love the saved addresses feature.", date: "2024-06-05", channel: "Mobile" },
  { id: "csat-011", rating: 1, category: "Delivery", comment: "Marked as delivered but not here. Neighbor didn't have it. Package lost.", date: "2024-06-06", channel: "Phone" },
  { id: "csat-012", rating: 4, category: "Product Quality", comment: "Great build quality on the electronics item. As described.", date: "2024-06-07", channel: "Web" },
  { id: "csat-013", rating: 3, category: "Checkout", comment: "Discount code didn't apply properly. Had to call to get refund.", date: "2024-06-07", channel: "Chat" },
  { id: "csat-014", rating: 5, category: "Subscription", comment: "Box had 5 full-sized products. Incredible value.", date: "2024-06-08", channel: "Email" },
  { id: "csat-015", rating: 2, category: "Support", comment: "Bot couldn't understand my issue and there was no way to reach a human.", date: "2024-06-09", channel: "Chat" },
];

export const appReviewsData: AppReview[] = [
  { id: "rev-001", platform: "iOS", rating: 5, title: "Finally fixed the checkout crash!", body: "The new update completely fixed the crash on payment screen. App is super smooth now. Using it daily.", date: "2024-06-01", version: "4.2.1" },
  { id: "rev-002", platform: "Android", rating: 2, title: "Search still broken", body: "Search results are completely irrelevant. Searching 'red dress size M' shows me men's shoes. Been broken for months. When will this be fixed??", date: "2024-06-01", version: "4.2.0" },
  { id: "rev-003", platform: "iOS", rating: 4, title: "Good but notifications overwhelming", body: "Love the app overall. Wish I could snooze deal notifications for specific categories. Getting 10 notifications a day for things I don't care about.", date: "2024-06-02", version: "4.2.1" },
  { id: "rev-004", platform: "Android", rating: 1, title: "App deleted all my wishlists", body: "Updated app and all 8 wishlists with 200+ items are GONE. This is unacceptable. My data should be sacred. Switching to competitor.", date: "2024-06-02", version: "4.2.0" },
  { id: "rev-005", platform: "iOS", rating: 5, title: "AR try-on feature is a game changer", body: "The new AR feature for furniture is incredible. Saved me from buying a couch that wouldn't fit. 10/10 feature, please add to clothing too!", date: "2024-06-03", version: "4.2.1" },
  { id: "rev-006", platform: "Android", rating: 3, title: "Decent app, slow loading", body: "Product images take forever to load on my Pixel 7. Other apps load instantly on same wifi. Something with image optimization is off.", date: "2024-06-04", version: "4.2.0" },
  { id: "rev-007", platform: "iOS", rating: 5, title: "Best shopping app period", body: "Seamless experience end to end. Search is fast, checkout is easy, tracking is real-time. Customer for life.", date: "2024-06-04", version: "4.2.1" },
  { id: "rev-008", platform: "Android", rating: 2, title: "Wishlist sync broken", body: "App doesn't sync wishlists between phone and tablet. Adding on one doesn't show on the other. Using Google Account but still broken.", date: "2024-06-05", version: "4.2.0" },
  { id: "rev-009", platform: "iOS", rating: 4, title: "Voice search is actually useful", body: "Added voice search to my regular workflow. Would love if it remembered previous searches. Minor UX improvement needed.", date: "2024-06-06", version: "4.2.1" },
  { id: "rev-010", platform: "Android", rating: 1, title: "Constant login loops", body: "Get logged out every single time I close the app. Re-entering password 5 times a day. Fingerprint login doesn't work. Android 14, Samsung Galaxy.", date: "2024-06-07", version: "4.2.0" },
  { id: "rev-011", platform: "iOS", rating: 5, title: "Order tracking is incredible", body: "Can see live tracking with driver location. Got photo of delivery. Everything I need in one place. Flawless.", date: "2024-06-07", version: "4.2.1" },
  { id: "rev-012", platform: "Android", rating: 3, title: "OK but needs dark mode improvements", body: "Dark mode exists but some screens still flash white on transition. Eye-catching and annoying in dark rooms.", date: "2024-06-08", version: "4.2.1" },
];

export const complaintsData: Complaint[] = [
  { id: "comp-001", category: "Billing", priority: "high", subject: "Double charge on order #ORD-8847221", description: "I was charged $234.50 twice for the same order. First charge on June 1, second on June 2. My bank confirms both transactions. Need immediate refund of the duplicate charge.", date: "2024-06-02", status: "resolved", resolution: "Refund of $234.50 processed June 4. Customer confirmed receipt." },
  { id: "comp-002", category: "Delivery", priority: "critical", subject: "Wedding gift never arrived — event already passed", description: "Placed order 3 weeks before wife's sister's wedding. Guaranteed delivery date was 5 days before. Order still shows 'processing'. Wedding was yesterday. This ruined a special moment.", date: "2024-06-05", status: "in_progress" },
  { id: "comp-003", category: "Product Quality", priority: "medium", subject: "Electronics item arrived visibly used", description: "Ordered a brand new Bose headphones. Arrived in taped box, ear cups show clear wear, previous audio settings still saved on device. Sold as 'new' but clearly a return resold as new.", date: "2024-06-03", status: "resolved", resolution: "Full refund + $25 credit issued. Seller account flagged for review." },
  { id: "comp-004", category: "Account Security", priority: "critical", subject: "Unauthorized purchases on my account", description: "Woke up to $847 in orders I didn't place. All shipping to an address in another state. Password changed without my input. Need immediate account freeze and fraud investigation.", date: "2024-06-04", status: "in_progress" },
  { id: "comp-005", category: "Customer Service", priority: "medium", subject: "Support rep was dismissive and rude", description: "Called about a product defect. Rep interrupted me multiple times, implied I was lying about the damage, and hung up before issue was resolved. Reference number 4892-B.", date: "2024-06-06", status: "resolved", resolution: "Formal apology issued, full refund processed, rep flagged for additional training." },
  { id: "comp-006", category: "Subscription", priority: "high", subject: "Charged for cancelled subscription", description: "Cancelled Premium subscription on May 15 (confirmation email attached). Still charged $49.99 on June 1. Cancellation portal showed 'success' but charge appeared anyway.", date: "2024-06-02", status: "resolved", resolution: "Refund processed. Bug in cancellation flow identified and fixed." },
  { id: "comp-007", category: "Product Quality", priority: "low", subject: "Size chart inaccurate for clothing item", description: "Ordered L based on size chart. Item fits like XS. Size chart on product page is clearly wrong — 3 inches off on chest measurement. Please update.", date: "2024-06-07", status: "open" },
  { id: "comp-008", category: "Delivery", priority: "high", subject: "Package left in rain despite delivery instructions", description: "Delivery instructions clearly say 'leave in covered porch'. Driver left $320 electronics order in uncovered driveway in rain. Item damaged. Photo evidence available.", date: "2024-06-08", status: "in_progress" },
];

export const callTranscriptsData: CallTranscript[] = [
  { id: "call-001", date: "2024-06-01", duration: "8:42", sentiment: "positive", topic: "Order Tracking", excerpt: "Customer: I just wanted to say the live tracking feature is amazing! I could see exactly where my package was. Agent: We're so glad to hear that! It's one of our most popular new features. Customer: Tell your team great job. I was nervous about the delivery window but seeing the map made it stress-free." },
  { id: "call-002", date: "2024-06-02", duration: "23:15", sentiment: "negative", topic: "Billing Dispute", excerpt: "Customer: I've been charged THREE times this month and nobody can tell me why. This is my rent money. Agent: I understand your frustration, let me pull up your account... Customer: I've called four times about this! Every rep says they'll escalate it and nothing happens. [supervisor requested] Supervisor: I can confirm we see the charges. We'll expedite a full refund in 24 hours and add $50 credit for the inconvenience." },
  { id: "call-003", date: "2024-06-03", duration: "5:30", sentiment: "positive", topic: "Returns Process", excerpt: "Customer: I was dreading this return but the pickup worked flawlessly. Agent: Our same-day pickup returns are designed to be hassle-free. Customer: The driver was here in 2 hours, scanned everything on the spot, and I already see the refund pending. That's incredible service." },
  { id: "call-004", date: "2024-06-04", duration: "34:07", sentiment: "negative", topic: "Account Security", excerpt: "Customer: Someone hacked my account. There are orders being shipped right now that I didn't place. Agent: I'm escalating this to our security team immediately and placing a hold on your account. Customer: How did this happen? I had two-factor authentication enabled! Agent: I can see your 2FA was disabled from a different device 3 days ago. Did you do that? Customer: Absolutely not. This is terrifying. Agent: Our fraud team will call you within 1 hour. All disputed charges will be reversed." },
  { id: "call-005", date: "2024-06-05", duration: "12:20", sentiment: "neutral", topic: "Product Information", excerpt: "Customer: I need to know if this blender is compatible with my existing accessories from the 2021 model. Agent: Let me check the compatibility guide... the base fits, but the blades changed design in 2023. Customer: So I'd need to buy new blades? Agent: Correct. However, we do have a bundle deal with the new blades included that saves you $15 compared to buying separately." },
  { id: "call-006", date: "2024-06-06", duration: "18:45", sentiment: "negative", topic: "Delivery Issue", excerpt: "Customer: This is the second time a package was marked delivered but wasn't here. Agent: I'm sorry to hear that. I can see the GPS coordinates show delivery was made to... Customer: That's not my address! Agent: You're right, it looks like there was a routing error. I'm filing an urgent claim and sending a replacement with next-day delivery at no charge. Customer: This keeps happening. Is there a systemic problem? Agent: I understand why you'd think that. I'm escalating this feedback to our delivery operations team." },
  { id: "call-007", date: "2024-06-07", duration: "9:55", sentiment: "positive", topic: "Subscription Benefits", excerpt: "Customer: I just upgraded to Premium and I'm not sure I'm getting all the benefits. Agent: Of course! Your account now includes free same-day delivery on eligible items, early access to sales 24 hours before public — which starts tomorrow actually — and our concierge service for returns. Customer: Wait, same-day delivery is free? I've been paying extra! Agent: Starting today it's included. I'm refunding the last 3 same-day fees, that's $23.97 back to you." },
  { id: "call-008", date: "2024-06-08", duration: "15:30", sentiment: "negative", topic: "App Technical Issue", excerpt: "Customer: Your app is completely broken. Every time I try to checkout it crashes. I've tried 5 times. Agent: I'm sorry about that. Can you tell me your device and app version? Customer: iPhone 14, latest iOS, app version 4.2.0. Agent: We're actually aware of a crash bug in that version affecting some iOS 17.4 devices. The fix is in version 4.2.1 which is already in the App Store. Customer: Why wasn't I notified? I almost missed a flash sale because of this. Agent: That's valid feedback. I'm noting this for our notification team and adding a $15 credit to your account for the frustration." },
];

export const chatLogsData: ChatLog[] = [
  {
    id: "chat-001", date: "2024-06-01", topic: "Order Status", sentiment: "positive", csat: 5,
    messages: [
      { role: "customer", text: "Hi, can you help me find my order? It was supposed to arrive yesterday." },
      { role: "agent", text: "Of course! Could you provide your order number?" },
      { role: "customer", text: "It's ORD-9923401" },
      { role: "agent", text: "I see your order is out for delivery right now! Our driver is 2 stops away, estimated arrival in 35 minutes. I've also sent you a live tracking link." },
      { role: "customer", text: "That's amazing, thank you! You're so fast!" },
    ]
  },
  {
    id: "chat-002", date: "2024-06-02", topic: "Product Question", sentiment: "neutral", csat: 3,
    messages: [
      { role: "customer", text: "Does this laptop come with Windows pre-installed?" },
      { role: "agent", text: "The model you're looking at comes with Windows 11 Home. However, I notice you might be interested in the Pro version — are you using it for business?" },
      { role: "customer", text: "Just personal use. Will it come with bloatware?" },
      { role: "agent", text: "It comes with standard Dell software. I can't remove it before shipping, but I can point you to the clean setup guide in our help center." },
      { role: "customer", text: "A bit disappointing but ok thanks." },
    ]
  },
  {
    id: "chat-003", date: "2024-06-03", topic: "Return Request", sentiment: "positive", csat: 5,
    messages: [
      { role: "customer", text: "I need to return shoes that don't fit. Bought 3 days ago." },
      { role: "agent", text: "No problem at all! I've processed your return. A pickup is scheduled for tomorrow 9am-12pm. No need to repackage — we'll handle that. Your refund will hit your account within 48 hours of pickup." },
      { role: "customer", text: "That's it? That was so easy! Usually returns are painful." },
      { role: "agent", text: "We've redesigned returns to be as seamless as possible. Is there anything else I can help with?" },
      { role: "customer", text: "Nope, you're great. 5 stars for sure." },
    ]
  },
  {
    id: "chat-004", date: "2024-06-04", topic: "Discount Code Issue", sentiment: "negative", csat: 2,
    messages: [
      { role: "customer", text: "Your SAVE20 code isn't working. Says invalid." },
      { role: "agent", text: "I'm sorry to hear that! Let me check the code validity..." },
      { role: "customer", text: "I got it from your email this morning. Subject line said 'Your exclusive 20% off'." },
      { role: "agent", text: "I see the issue — that code is for the Home & Kitchen category only. Your cart has Electronics items." },
      { role: "customer", text: "That's not in the email AT ALL. The email says 'everything in your cart'. This is false advertising." },
      { role: "agent", text: "You're absolutely right, the email copy was misleading. I'm applying the 20% discount manually to your current cart as an exception, and flagging this to our marketing team." },
      { role: "customer", text: "Fine but this shouldn't happen." },
    ]
  },
  {
    id: "chat-005", date: "2024-06-05", topic: "Subscription Enquiry", sentiment: "positive", csat: 5,
    messages: [
      { role: "customer", text: "What's the difference between Premium and Premium Plus?" },
      { role: "agent", text: "Great question! Premium gives you free same-day delivery, early sale access, and free returns. Premium Plus adds: dedicated phone line (no wait times), monthly $20 store credit, exclusive member-only deals, and priority customer service queue. It's $12/mo more." },
      { role: "customer", text: "The $20 credit alone covers the extra cost. I'm upgrading now!" },
      { role: "agent", text: "Awesome choice! I've upgraded your account. Your first $20 credit is already in your account. You're also just in time for tomorrow's member-only early access sale!" },
    ]
  },
  {
    id: "chat-006", date: "2024-06-06", topic: "App Bug Report", sentiment: "negative", csat: 1,
    messages: [
      { role: "customer", text: "Your Android app is absolute garbage. Lost all my saved wishlists after updating." },
      { role: "agent", text: "I'm very sorry this happened! This is a known issue with the 4.2.0 Android update. Our engineers are working on recovery." },
      { role: "customer", text: "KNOWN ISSUE? Why did you push it live?! I had years of wishlists. 200+ items." },
      { role: "agent", text: "That's completely fair and I understand your frustration. Our team is working on a data recovery script. Can you share your account email so I can flag yours as priority for recovery?" },
      { role: "customer", text: "This is unacceptable. I'm switching to a competitor if this isn't fixed today." },
      { role: "agent", text: "I hear you. Your account is flagged as priority. Our engineering team will have an update within 4 hours. I've also added $30 credit as a gesture of goodwill." },
    ]
  },
  {
    id: "chat-007", date: "2024-06-07", topic: "Price Match", sentiment: "neutral", csat: 4,
    messages: [
      { role: "customer", text: "I found this same TV $80 cheaper at BestBuy. Do you price match?" },
      { role: "agent", text: "Yes, we do! For items that are identical model and in stock at a qualified retailer. Can you share the BestBuy link?" },
      { role: "customer", text: "[link shared]" },
      { role: "agent", text: "Verified! The Samsung QN55Q80C is $849 at BestBuy vs our $929. I've adjusted your price to $849. Your cart has been updated." },
      { role: "customer", text: "Thanks! That was surprisingly painless." },
    ]
  },
  {
    id: "chat-008", date: "2024-06-08", topic: "Damaged Item", sentiment: "negative", csat: 3,
    messages: [
      { role: "customer", text: "My package arrived and the item inside is cracked. I have photos." },
      { role: "agent", text: "I'm so sorry! Please share the photos so I can document this." },
      { role: "customer", text: "[photos attached — cracked ceramic vase]" },
      { role: "agent", text: "Clear damage in transit. I'm sending a replacement immediately — should arrive in 2 business days. No need to return the damaged item, please dispose of it safely." },
      { role: "customer", text: "OK thanks. Will the replacement have better packaging? This one was just wrapped in paper." },
      { role: "agent", text: "Great point. I'm adding a note to use foam padding for this product category. Thank you for that feedback." },
    ]
  },
];

export const allFeedbackSummary = {
  totalResponses: npsData.length + csatData.length + appReviewsData.length + complaintsData.length + callTranscriptsData.length + chatLogsData.length,
  avgNPS: Math.round(npsData.reduce((sum, r) => sum + r.score, 0) / npsData.length * 10) / 10,
  avgCSAT: Math.round(csatData.reduce((sum, r) => sum + r.rating, 0) / csatData.length * 10) / 10,
  avgAppRating: Math.round(appReviewsData.reduce((sum, r) => sum + r.rating, 0) / appReviewsData.length * 10) / 10,
  openComplaints: complaintsData.filter(c => c.status === "open" || c.status === "in_progress").length,
  criticalComplaints: complaintsData.filter(c => c.priority === "critical").length,
  negativeSentimentCalls: callTranscriptsData.filter(c => c.sentiment === "negative").length,
  negativeSentimentChats: chatLogsData.filter(c => c.sentiment === "negative").length,
};
