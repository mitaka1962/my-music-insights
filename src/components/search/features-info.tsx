import { AudioFeatures } from "@/lib/definitions";
import { convertPercentage } from "@/lib/utils";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function FeaturesInfo({
  info,
  features,
}: {
  info: Array<{name: string, value: number | string}>;
  features: AudioFeatures;
}) {
  const featuresList = [
    { name: 'acousticness', value: features.acousticness,
      desc: 'トラックがアコースティックである（電気楽器を使用していない）可能性を表してます。' },
    { name: 'danceability', value: features.danceability,
      desc: 'トラックがダンスに適している度合いを表してます。' },
    { name: 'energy', value: features.energy,
      desc: 'トラックの激しさや活気の度合いを表しています。' },
    { name: 'instrumentalness', value: features.instrumentalness,
      desc: 'トラックがインストゥルメンタル（ボーカル無し）である可能性を表しています。' },
    { name: 'liveness', value: features.liveness,
      desc: 'トラックがライブ演奏である可能性を表しています。' },
    { name: 'speechiness', value: features.speechiness,
      desc: 'トラック内を話し言葉が占める度合いを表しています。' },
    { name: 'valence', value: features.valence,
      desc: 'トラックのポジティブさの度合いを表しています。' },
  ];

  return (
    <div className="card card-bordered">
      <div className="card-body">
        <div className="flex gap-4 mb-4">
          {info.map(
            (item) => (
              <div key={item.name} className="flex gap-2 items-center">
                <div className="text-gray-600 text-sm">{item.name}:</div>
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
                <div className="flex gap-1 items-center text-gray-600 text-sm">
                  {item.name}
                  <div className="tooltip" data-tip={item.desc}>
                    <InformationCircleIcon className="w-4 hover:text-black" />
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
