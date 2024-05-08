import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  const creditBalance = 10

  if(!userId) redirect('/sign-in')

  // const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          // userId={user._id}
          userId={userId}
          type={transformation.type as TransformationTypeKey}
          // creditBalance={user.creditBalance}
          creditBalance={creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage