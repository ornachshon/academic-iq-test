import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // Header / Layout
    startIQTest: "Start IQ Test",

    // Hero
    overMillionPeople: "Over 8 million people have taken this test",
    averageIQ: "The average IQ in",
    averageIQSuffix: "is",
    takeTest: "Take this IQ test and check",
    whatIsYourIQ: "what is your IQ",
    answer30Questions: "Answer 30 questions",
    getFreeScore: "Get your IQ score instantly for free",
    compareWorldwide: "See how you compare to people worldwide",
    detailedReport: "Detailed cognitive performance report",

    // IQ Test Page
    readyToBegin: "Ready to Begin?",
    introDesc: "You'll answer 30 questions in 20 minutes. The test measures pattern recognition, numerical reasoning, and spatial intelligence.",
    questionsLabel: "Questions",
    minutesLabel: "Minutes",
    categoriesLabel: "Categories",
    startTest: "Start Test",
    questionLabel: "Question",
    back: "Back",
    skip: "Skip",
    next: "Next",
    finishTest: "Finish Test",
    questionsAnswered: (answered, total) => `${answered} of ${total} questions answered`,

    // Email modal
    almostThere: "Almost there!",
    enterEmailToSee: "Enter your email to see your results",
    emailPlaceholder: "your@email.com",
    seeMyResults: "See My Results",
    byClickingAgree: "By clicking you agree to our",
    termsAndConditions: "Terms & Conditions",
    and: "and",
    privacyPolicy: "Privacy Policy",

    // Checkout
    youCompleted: "You completed the test in",
    minutes: "minutes",
    highlyCompetent: "It seems that you are highly competent in",
    visuospatial: "Visuospatial Pattern Reasoning",
    iqAnalyzed: "Your IQ test was analyzed and compared to other participants' results in your country.",
    orderDetails: "Order Details",
    iqEvaluationScore: "IQ Evaluation Score",
    yourOverallScore: "Your overall World Wide IQ score",
    yourIQScore: "Your IQ Score",
    printableCertificate: "Printable Academic IQ Certificate",
    yourCertificate: "Your very own Academic IQ Certificate",
    highQualityPDF: "(High Quality Downloadable PDF)",
    detailedReportItem: "Academic IQ Test details report",
    fullStatistical: "With a full statistical analysis of your result",
    totalToday: "Total today:",
    continueToPayment: "Continue to Payment",
    customerReviews: "Customer Reviews & Feedback",
    afterResults: "After you get your results you are welcome to also share a review",
    averageRating: "Average Rating: Very good",

    // Info page
    oneMoreStep: "One more step before your results!",
    yourName: "Your Name",
    yourAge: "Your Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    preferNotToSay: "Prefer not to say",
    purposeOfTest: "Purpose of taking the test",
    personal: "Personal curiosity",
    academic: "Academic / Research",
    professional: "Professional",
    other: "Other",
    getMyResults: "Get My Results",
    namePlaceholder: "John Doe",
    agePlaceholder: "25",

    // Thankyou
    paymentSuccess: "Payment Successful!",
    yourIQIs: "Your IQ Score is",
    viewResults: "View Detailed Results",
    viewCertificate: "View Certificate",
    thankYouMessage: "Thank you for taking the Academic IQ Test!",

    // About Section
    aboutP1: "The Academic IQ Test is part of an ambitious effort to deliver fun, stimulating and engaging online measures of human cognitive abilities, as well as social and emotional learning skills for the global community.",
    aboutP2: "We aim to provide you with accurate and precise information about important aspects of your intellectual abilities and personality characteristics, and where they may benefit the most from further development, regardless of your academic, professional, or cultural background.",
    aboutP3: "The current version measures several dimensions of general fluid intelligence, including visuospatial pattern reasoning, visuospatial insight, and numerical pattern reasoning skills.",
    step1Title: "Take the IQ Test",
    step1Desc: "Designed by experts and test developers",
    step2Title: "Find out your scores",
    step2Desc: "Get your customized score report and learn how you compare to thousands of adults from all over the world",
    step3Title: "Start your brain power journey",
    step3Desc: "Unleash your full potential with brain training designed to improve your memory, focus and problem-solving skills",
    whyThisTest: "Why this IQ test?",
    whyP1: "The Academic IQ Test presents you with a short series of fun, challenging problems designed to measure your fluid intelligence abilities and provide you with both accurate and precise scores.",
    whyP2: "You can take the test online anytime from any mobile device or desktop computer and immediately receive a detailed score report that tells you how your performance compares to thousands of adults from all over the world.",

    // Email Modal
    emailModalTitle1: "Where to send your IQ score",
    emailModalTitle2: "and performance report?",
    emailModalSubtitle: "Please enter your email:",
    processing: "Processing...",
    privacyNote: "We value your privacy. Your email will never be shared with anyone.",

    // Footer
    allRightsReserved: "All rights reserved",
    privacyPolicyLink: "Privacy Policy",
    termsLink: "Terms & Conditions",
    contactUs: "Contact Us",
    support: "Support",
  },
  ja: {
    // Header / Layout
    startIQTest: "IQテストを開始",

    // Hero
    overMillionPeople: "800万人以上がこのテストを受けました",
    averageIQ: "平均IQは",
    averageIQSuffix: "です",
    takeTest: "このIQテストを受けて",
    whatIsYourIQ: "あなたのIQを確認しましょう",
    answer30Questions: "30問に答える",
    getFreeScore: "すぐに無料でIQスコアを取得",
    compareWorldwide: "世界中の人々と比較",
    detailedReport: "詳細な認知パフォーマンスレポート",

    // IQ Test Page
    readyToBegin: "始める準備はできましたか？",
    introDesc: "20分間で30問に答えていただきます。テストはパターン認識、数値推論、空間知性を測定します。",
    questionsLabel: "問題数",
    minutesLabel: "分",
    categoriesLabel: "カテゴリ",
    startTest: "テストを開始する",
    questionLabel: "問題",
    back: "戻る",
    skip: "スキップ",
    next: "次へ",
    finishTest: "テストを終了する",
    questionsAnswered: (answered, total) => `${total}問中${answered}問回答済み`,

    // Email modal
    almostThere: "もう少し！",
    enterEmailToSee: "結果を見るにはメールアドレスを入力してください",
    emailPlaceholder: "your@email.com",
    seeMyResults: "結果を見る",
    byClickingAgree: "クリックすることで同意します",
    termsAndConditions: "利用規約",
    and: "および",
    privacyPolicy: "プライバシーポリシー",

    // Checkout
    youCompleted: "テストを",
    minutes: "分で完了しました",
    highlyCompetent: "あなたは非常に優れています：",
    visuospatial: "視空間パターン推論",
    iqAnalyzed: "あなたのIQテストが分析され、あなたの国の他の参加者の結果と比較されました。",
    orderDetails: "注文詳細",
    iqEvaluationScore: "IQ評価スコア",
    yourOverallScore: "あなたの世界全体のIQスコア",
    yourIQScore: "あなたのIQスコア",
    printableCertificate: "印刷可能な学術IQ証明書",
    yourCertificate: "あなただけの学術IQ証明書",
    highQualityPDF: "（高品質ダウンロード可能PDF）",
    detailedReportItem: "学術IQテスト詳細レポート",
    fullStatistical: "結果の完全な統計分析付き",
    totalToday: "本日の合計：",
    continueToPayment: "お支払いへ進む",
    customerReviews: "お客様のレビューとフィードバック",
    afterResults: "結果を受け取った後、レビューを共有することができます",
    averageRating: "平均評価：非常に良い",

    // Info page
    oneMoreStep: "結果を表示する前にもう一ステップ！",
    yourName: "お名前",
    yourAge: "年齢",
    gender: "性別",
    male: "男性",
    female: "女性",
    preferNotToSay: "答えたくない",
    purposeOfTest: "テストを受ける目的",
    personal: "個人的な好奇心",
    academic: "学術・研究",
    professional: "プロフェッショナル",
    other: "その他",
    getMyResults: "結果を取得",
    namePlaceholder: "山田太郎",
    agePlaceholder: "25",

    // Thankyou
    paymentSuccess: "お支払いが完了しました！",
    yourIQIs: "あなたのIQスコアは",
    viewResults: "詳細結果を見る",
    viewCertificate: "証明書を見る",
    thankYouMessage: "学術IQテストを受けていただきありがとうございます！",

    // About Section
    aboutP1: "Academic IQ Testは、世界のコミュニティのために、人間の認知能力や社会的・感情的学習スキルをオンラインで楽しく、刺激的に測定するという意欲的な取り組みの一環です。",
    aboutP2: "私たちは、学術的・職業的・文化的背景に関わらず、あなたの知的能力や個性的特性の重要な側面について、正確で精密な情報を提供することを目指しています。",
    aboutP3: "現在のバージョンでは、視空間パターン推論、視空間的洞察力、数値パターン推論スキルなど、流動的知性のいくつかの次元を測定します。",
    step1Title: "IQテストを受ける",
    step1Desc: "専門家とテスト開発者によって設計されました",
    step2Title: "スコアを確認する",
    step2Desc: "カスタマイズされたスコアレポートを取得し、世界中の何千人もの大人と比較する方法を学びましょう",
    step3Title: "脳力の旅を始める",
    step3Desc: "記憶力、集中力、問題解決能力を向上させるためのブレイントレーニングで、あなたの潜在能力を最大限に引き出しましょう",
    whyThisTest: "なぜこのIQテストなのか？",
    whyP1: "Academic IQ Testは、流動的知性能力を測定し、正確で精密なスコアを提供するために設計された、楽しく挑戦的な問題のシリーズを提供します。",
    whyP2: "スマートフォンやパソコンからいつでもオンラインでテストを受けることができ、世界中の何千人もの大人と比較した詳細なスコアレポートをすぐに受け取ることができます。",

    // Email Modal
    emailModalTitle1: "IQスコアと",
    emailModalTitle2: "パフォーマンスレポートの送り先は？",
    emailModalSubtitle: "メールアドレスを入力してください：",
    processing: "処理中...",
    privacyNote: "プライバシーを大切にしています。メールアドレスが第三者に共有されることはありません。",

    // Footer
    allRightsReserved: "全著作権所有",
    privacyPolicyLink: "プライバシーポリシー",
    termsLink: "利用規約",
    contactUs: "お問い合わせ",
    support: "サポート",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("selectedLanguage") || "en");

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("selectedLanguage");
      if (saved) setLang(saved);
    };
    window.addEventListener("languageChanged", handleStorage);
    return () => window.removeEventListener("languageChanged", handleStorage);
  }, []);

  const t = (key, ...args) => {
    const val = translations[lang]?.[key] ?? translations["en"][key] ?? key;
    return typeof val === "function" ? val(...args) : val;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}