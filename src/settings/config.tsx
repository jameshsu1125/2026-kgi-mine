export const PAGE = {
  home: 'home',
  journey: 'journey',
};

export const REST_PATH = {
  start: 'immersion/content',
  questions: 'immersion/miner',
};

export const Debug = {
  resource: true,
  randomScene: true,
  sceneItems: false,
  fps: 60,
};

export const SceneSize = {
  width: 3840,
  height: 1080,
};

export const SceneDepth = {
  back: 0.01,
  middle: 0.1,
  front: 0.6,
};

export const PATTERN_URI_PROPERTIES = [
  { path: 'pattern-icon-career.png', name: 'pattern-icon-career' },
  { path: 'pattern-icon-finance.png', name: 'pattern-icon-finance' },
  { path: 'pattern-icon-health.png', name: 'pattern-icon-health' },
  { path: 'pattern-icon-relations.png', name: 'pattern-icon-relations' },
  { path: 'pattern-icon-society.png', name: 'pattern-icon-society' },
];

type TQuestionnaireOption = {
  headline: React.ReactNode;
  options?: { label: string; value: string }[];
  confirmLabel?: string;
  type: 'Modal' | 'Recent';
}[];

export const QuestionnaireOptions: TQuestionnaireOption = [
  {
    headline: (
      <>
        太厲害了！
        <br />
        成功解鎖許願新路線的權限
      </>
    ),
    confirmLabel: '許願新路線',
    type: 'Modal',
  },
  {
    headline: (
      <>
        你最想跟哪一位導航員
        <br />
        共同探索下一段豐盛旅程？（可複選）
      </>
    ),
    options: [
      { label: '人選 A', value: 'A' },
      { label: '人選 B', value: 'B' },
      { label: '人選 C', value: 'C' },
      { label: '人選 D', value: 'D' },
      { label: '人選 E', value: 'E' },
    ],
    type: 'Modal',
    confirmLabel: '確認',
  },
  {
    headline: (
      <>
        最想深入挖掘的主題？
        <br />
        （可複選）
      </>
    ),
    options: [
      { label: '解鎖複利魔法', value: 'A' },
      { label: '建立高效習慣', value: 'B' },
      { label: '穩健的退休規劃', value: 'C' },
      { label: '培養你的豐盛盟友', value: 'D' },
      { label: '提升溝通與關係的質感', value: 'E' },
    ],
    confirmLabel: '確認',
    type: 'Modal',
  },
  {
    headline: <>探索更多活動</>,
    type: 'Recent',
  },
  {
    headline: (
      <>
        感謝你的填答
        <br />
        願望我們收到囉！
      </>
    ),
    confirmLabel: '瀏覽所有內容',
    type: 'Modal',
  },
];
