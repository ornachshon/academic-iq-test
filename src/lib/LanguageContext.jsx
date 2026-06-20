import React, { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

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
    discountBanner: "80% discount reserved for:",
    oneTimeFeeOnly: "One-time fee only",
    youSave80: "You save 80%",
    redirectingToPayment: "Redirecting to payment...",
    getMyIQResults: "Get My IQ Results",

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
    testIntroTitle: "Academic IQ Test",
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
    emailModalTitle1: "Impressive! Your IQ results show above average",
    emailModalHeadline: "Great news!",
    emailModalSubheadline: "Your IQ results are ready.",
    emailModalTitle2: "Where should we send your IQ results?",
    emailModalSubtitle: "",
    processing: "Processing...",
    privacyNote: "Your email is private and never shared.",
    emailRequired: "Please enter your email.",

    // Results page
    yourIQTestResults: "Your IQ Test Results",
    hereIsHowYouPerformed: "Here's how you performed",
    resultNotFound: "Result not found",
    goHome: "Go Home",
    performanceSummary: "Performance Summary",
    correctAnswers: "Correct Answers",
    timeTakenLabel: "Time Taken",
    percentile: "Percentile",
    iqScoreLabel: "IQ Score",
    topPercentile: (p) => `Top ${p}%`,
    iqDistribution: "IQ Distribution",
    scoreVsGlobal: "Your score compared to the global population",
    cognitiveBreakdown: "Cognitive Breakdown",
    retakeTest: "Retake Test",
    shareResults: "Share Results",
    myIQTestResults: "My IQ Test Results",
    iScoredText: (score) => `I scored ${score} on the IQ Test! Take the test yourself.`,

    // Calculating popup
    calculatingResults: "Calculating Results",
    analyzingAnswers: "Analyzing your answers...",
    halfwayTitle: "Good Job!",
    halfwayDesc: "You're halfway there — keep it up!",
    halfwayContinue: "Continue",

    // Payment page
    preparingPayment: "Preparing payment...",
    paymentError: "Payment Error",
    goBack: "Go Back",
    loadingPayment: "Loading payment...",

    // Checkout modal
    securePayment: "Secure Payment",
    noSubscription: "🔒 No subscription. One-time payment only.",
    loadingPaymentForm: "Loading payment form...",

    // Stripe payment modal
    paymentSecurityNotice: "All transactions are secure and encrypted. Credit Card information is never stored.",
    orPayWithCard: "Or Pay with Card",
    cardNumberPlaceholder: "CARD NUMBER",
    getMyIQResult: "Get My IQ Result",
    paymentSuccessful: "Payment Successful!",
    redirectingToResults: "Redirecting to your results...",
    paymentInitFailed: "Payment initialization failed. Please try again.",
    paymentFailedInit: "Failed to initialize payment.",
    paymentErrorGeneric: "Something went wrong.",
    pricingMissing: "Pricing information is missing.",

    // Thankyou page
    yourIQScoreIs: "Your IQ Score is:",
    wePreparedEverything: "We've prepared everything for you",
    personalizedCertificate: "Personalized IQ Certificate",
    certificateReady: "A personalized certificate is ready for you to download with just one click.",
    downloadCertificate: "Download Certificate",
    detailedAnalysisReport: "Detailed Analysis Report",
    fullStatisticalBreakdown: "A full statistical breakdown of your results with cognitive domain insights.",
    viewReport: "View Report",

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
    discountBanner: "80%割引の残り時間：",
    oneTimeFeeOnly: "一回限りの料金",
    youSave80: "80%お得",
    redirectingToPayment: "お支払いページへ移動中...",
    getMyIQResults: "IQ結果を取得する",

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
    testIntroTitle: "Academic IQ Test",
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
    emailModalTitle1: "素晴らしい！あなたのIQ結果は平均以上です",
    emailModalHeadline: "素晴らしい！",
    emailModalSubheadline: "IQ結果の準備ができました。",
    emailModalTitle2: "IQ結果をどこのメールアドレスに送信しますか？",
    emailModalSubtitle: "",
    processing: "処理中...",
    privacyNote: "メールアドレスは非公開で、第三者に共有されることはありません。",
    emailRequired: "メールアドレスを入力してください。",

    // Results page
    yourIQTestResults: "IQテスト結果",
    hereIsHowYouPerformed: "あなたの成績はこちらです",
    resultNotFound: "結果が見つかりません",
    goHome: "ホームへ",
    performanceSummary: "パフォーマンスサマリー",
    correctAnswers: "正解数",
    timeTakenLabel: "所要時間",
    percentile: "パーセンタイル",
    iqScoreLabel: "IQスコア",
    topPercentile: (p) => `上位 ${p}%`,
    iqDistribution: "IQ分布",
    scoreVsGlobal: "世界の人口と比較したあなたのスコア",
    cognitiveBreakdown: "認知能力の内訳",
    retakeTest: "再挑戦する",
    shareResults: "結果をシェア",
    myIQTestResults: "私のIQテスト結果",
    iScoredText: (score) => `IQテストで${score}点を獲得しました！あなたも挑戦してみてください。`,

    // Calculating popup
    calculatingResults: "結果を計算中",
    analyzingAnswers: "あなたの回答を分析しています...",
    halfwayTitle: "よくできました！",
    halfwayDesc: "半分まで来ました — この調子で続けてください！",
    halfwayContinue: "続ける",

    // Payment page
    preparingPayment: "お支払いの準備中...",
    paymentError: "お支払いエラー",
    goBack: "戻る",
    loadingPayment: "お支払いを読み込み中...",

    // Checkout modal
    securePayment: "安全なお支払い",
    noSubscription: "🔒 サブスクリプションなし。一回限りのお支払いのみ。",
    loadingPaymentForm: "お支払いフォームを読み込み中...",

    // Stripe payment modal
    paymentSecurityNotice: "すべての取引は安全に暗号化されています。クレジットカード情報は保存されません。",
    orPayWithCard: "またはカードでお支払い",
    cardNumberPlaceholder: "カード番号",
    getMyIQResult: "IQ結果を取得",
    paymentSuccessful: "お支払いが完了しました！",
    redirectingToResults: "結果ページへ移動中...",
    paymentInitFailed: "お支払いの初期化に失敗しました。再度お試しください。",
    paymentFailedInit: "お支払いの初期化に失敗しました。",
    paymentErrorGeneric: "エラーが発生しました。",
    pricingMissing: "価格情報が不足しています。",

    // Thankyou page
    yourIQScoreIs: "あなたのIQスコア：",
    wePreparedEverything: "すべてご用意しました",
    personalizedCertificate: "パーソナライズされたIQ証明書",
    certificateReady: "ワンクリックでダウンロードできる証明書が準備できました。",
    downloadCertificate: "証明書をダウンロード",
    detailedAnalysisReport: "詳細分析レポート",
    fullStatisticalBreakdown: "認知領域の洞察を含む結果の完全な統計的内訳です。",
    viewReport: "レポートを見る",

    // Footer
    allRightsReserved: "全著作権所有",
    privacyPolicyLink: "プライバシーポリシー",
    termsLink: "利用規約",
    contactUs: "お問い合わせ",
    support: "サポート",
  },
};

const LanguageContext = createContext();

function detectDefaultLanguage() {
  const saved = localStorage.getItem("selectedLanguage");
  if (saved) return saved;
  const browserLang = navigator.language || navigator.userLanguage || "";
  if (browserLang.toLowerCase().startsWith("ja")) return "ja";
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => detectDefaultLanguage());

  useEffect(() => {
    // Always check geo on first visit (only skip if user manually picked a language)
    const manuallySet = localStorage.getItem("manualLanguageSet");
    if (!manuallySet) {
      base44.functions.invoke("getLocationPrice", { language: "en" })
        .then((res) => {
          if (res.data?.detected_country === "JP") {
            setLang("ja");
          }
        })
        .catch(() => {});
    }
  }, []);

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