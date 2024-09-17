import PasswordForm from "@/components/forms/PasswordForm";

function Profile() {
	return (
		<div className="flex-column min-[500px]:row-flex-start !items-start gap-8">
			<div className="flex-1 w-full">
				<h3 className="mb-1.5">Personal Information</h3>
				<p className="text-sm tracking-tight text-foreground-100">
					Manage your account password
				</p>
			</div>

			<div className="flex-1 w-full max-sm:px-1">
				<PasswordForm />
			</div>
		</div>
	);
}

export default Profile;
