export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome to the profile page</h1>
      <p className="text-4xl">Profile Page</p>
      <span>{params.id}</span>
    </div>
  );
}
