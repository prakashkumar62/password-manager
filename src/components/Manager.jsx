import { useEffect, useState } from "react";
import eye from "../assets/eye.jpg";
import eyeclose from "../assets/eyeclose.png";

const Manager = () => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState({});

  // Load passwords from localStorage
  useEffect(() => {
    const savedPasswords = localStorage.getItem("password");

    if (savedPasswords) {
      setPasswordArray(JSON.parse(savedPasswords));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Save password
  const savePassword = (e) => {
    e.preventDefault();

    // Validation
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const newPassword = {
      id: Date.now(),
      site: form.site,
      username: form.username,
      password: form.password,
    };

    const updatedPasswords = [...passwordArray, newPassword];

    setPasswordArray(updatedPasswords);

    localStorage.setItem(
      "password",
      JSON.stringify(updatedPasswords)
    );

    // Clear form
    setForm({
      site: "",
      username: "",
      password: "",
    });
  };

  // Show / Hide password
  const togglePassword = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Delete password
  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter(
      (item) => item.id !== id
    );

    setPasswordArray(updatedPasswords);

    localStorage.setItem(
      "password",
      JSON.stringify(updatedPasswords)
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background */}
      <div className="fixed inset-0  bg-[radial-gradient(circle_at_top,#172554,transparent_45%),radial-gradient(circle_at_bottom_right,#312e81,transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-blue-500">
              &lt;Pass
            </span>
            <span className="text-green-400">
              Op&gt;
            </span>
          </h1>

          <p className="mt-3 text-lg text-slate-300">
            Your own secure password manager
          </p>

        </div>


        {/* Form Card */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl backdrop-blur">

          <form onSubmit={savePassword}>

            {/* Website */}
            <div className="mb-5">

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Website
              </label>

              <input
                type="text"
                name="site"
                value={form.site}
                onChange={handleChange}
                placeholder="e.g. google.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

            </div>


            {/* Username + Password */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Username */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword.form ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        form: !prev.form,
                      }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <img
                      src={
                        showPassword.form
                          ? eye
                          : eyeclose
                      }
                      alt="toggle password"
                      className="h-6 w-6 object-contain"
                    />
                  </button>

                </div>

              </div>

            </div>


            {/* Add Button */}
            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
            >
              <span className="text-xl">+</span>
              Add Password
            </button>

          </form>

        </div>


        {/* Password List */}
        <div className="mx-auto mt-10 max-w-5xl">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Your Passwords
            </h2>

            <span className="rounded-full bg-slate-800 px-4 py-1 text-sm text-slate-300">
              {passwordArray.length} saved
            </span>

          </div>


          {/* Empty State */}
          {passwordArray.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center">

              <div className="mb-3 text-4xl">
                🔐
              </div>

              <h3 className="text-xl font-semibold">
                No passwords saved
              </h3>

              <p className="mt-2 text-slate-400">
                Add your first password using the form above.
              </p>

            </div>

          ) : (

            /* Table */
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 shadow-xl">

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="bg-slate-800">

                    <tr>

                      <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                        Website
                      </th>

                      <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                        Username
                      </th>

                      <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                        Password
                      </th>

                      <th className="px-5 py-4 text-center text-sm font-semibold text-slate-300">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-slate-800">

                    {passwordArray.map((item) => (

                      <tr
                        key={item.id}
                        className="transition hover:bg-slate-800/60"
                      >

                        {/* Website */}
                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                              🌐
                            </div>

                            <span className="font-medium text-white">
                              {item.site}
                            </span>

                          </div>

                        </td>


                        {/* Username */}
                        <td className="px-5 py-4 text-slate-300">
                          {item.username}
                        </td>


                        {/* Password */}
                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <span className="font-mono text-slate-300">

                              {showPassword[item.id]
                                ? item.password
                                : "••••••••"}

                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                togglePassword(item.id)
                              }
                              className="rounded-lg p-1.5 transition hover:bg-slate-700"
                            >

                              <img
                                src={
                                  showPassword[item.id]
                                    ? eye
                                    : eyeclose
                                }
                                alt="toggle password"
                                className="h-5 w-5 object-contain"
                              />

                            </button>

                          </div>

                        </td>


                        {/* Delete */}
                        <td className="px-5 py-4 text-center">

                          <button
                            type="button"
                            onClick={() =>
                              deletePassword(item.id)
                            }
                            className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Manager;