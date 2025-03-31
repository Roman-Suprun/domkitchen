import NextImage from 'next/image';

import { getIngredients } from 'actions/ingredient/getListing';
import { ProfileIngredientsFilter } from 'features/Profile/ProfileIngedientsFilter';
import { auth } from 'shared/lib/auth';

import { getUser } from '../../actions/profile/getUserAction';
import { getUserAllergies } from '../../actions/profile/getUserAllergies';
import { AvatarPlaceholder } from '../../shared/ui/AvatarPlaceholder';

export const ProfilePageView = async () => {
  const session = await auth();
  const { user } = session || {};
  const { email } = user || {};
  const { data } = await getUser(email);
  const { firstName, lastName, profileImage, id } = data || {};
  const userAllergiesIngredients = await getUserAllergies(id);
  const { data: ingredientsData } = await getIngredients();

  if (!id || !ingredientsData) return null;

  return (
    <section className="flex flex-col items-center max-w-max md:max-w-[50%] w-full py-10">
      {profileImage ? (
        <NextImage
          className="!relative rounded-full !w-[100px] !h-[100px]"
          src={profileImage}
          alt=""
          fill
        />
      ) : (
        <AvatarPlaceholder size="l" firstName={firstName} lastName={lastName} />
      )}

      <div className="flex mt-10 text-4xl">
        {firstName} {lastName}
      </div>

      <ProfileIngredientsFilter
        className="mt-6"
        userAllergiesIngredients={userAllergiesIngredients}
        ingredientsData={ingredientsData}
        userId={id}
      />
    </section>
  );
};
