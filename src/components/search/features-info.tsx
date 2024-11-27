import { AudioFeatures, NormalizedAudioFeatures } from "@/lib/definitions";
import { convertPercentage } from "@/lib/utils";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function FeaturesInfo({
  info,
  features,
}: {
  info: Array<{name: string, value: number | string}>;
  features: NormalizedAudioFeatures;
}) {
  const featuresList = [
    { name: 'acousticness', value: features.acousticness,
      desc: '楽曲がアコースティックである（電気楽器を使用していない）可能性を表してます。' },
    { name: 'danceability', value: features.danceability,
      desc: '楽曲がダンスに適している度合いを表してます。' },
    { name: 'energy', value: features.energy,
      desc: '楽曲の激しさや活気の度合いを表しています。' },
    { name: 'instrumentalness', value: features.instrumentalness,
      desc: '楽曲がインストゥルメンタル（ボーカル無し）である可能性を表しています。' },
    { name: 'liveness', value: features.liveness,
      desc: '楽曲がライブ演奏である可能性を表しています。' },
    { name: 'speechiness', value: features.speechiness,
      desc: '楽曲内を話し言葉が占める度合いを表しています。' },
    { name: 'valence', value: features.valence,
      desc: '楽曲のポジティブさの度合いを表しています。' },
  ];

  return (
    <div className="card card-bordered">
      <div className="card-body">
        <div className="flex gap-4 mb-4">
          {info.map(
            (item) => (
              <div key={item.name} className="flex gap-2 items-center">
                <div className="text-base-content/80 text-sm">{item.name}:</div>
                <div className="text-2xl font-bold">
                  {item.value}
                </div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuresList.map(
            (item) => (
              <div key={item.name}>
                <div className="flex gap-1 items-center text-base-content/80 text-sm">
                  {item.name}
                  <div
                    tabIndex={0}
                    aria-label="特徴量の詳細"
                    className="tooltip before:w-56 focus-visible:before:opacity-100 focus-visible:after:opacity-100"
                    data-tip={item.desc}
                  >
                    <InformationCircleIcon className="w-4 hover:text-black dark:hover:text-white" />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <progress className="progress" value={item.value} ></progress>
                  <div className="w-12">{`${convertPercentage(item.value)}%`}</div>
                </div>  
              </div>
            )
          )}
        </div>
      </div>      
    </div>
  );
}
