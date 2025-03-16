import { FC } from 'react';

export const RecipeMetaInfo: FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
};
