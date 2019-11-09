# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Timesheet2.Repo.insert!(%Timesheet2.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Timesheet2.Repo
alias Timesheet2.Users.User
alias Timesheet2.Jobs.Job

pw = Argon2.hash_pwd_salt("password1234")

Repo.insert!(%User{name: "Alice Anderson", email: "alice@acme.com", isManager: true, password_hash: pw})
Repo.insert!(%User{name: "Bob Anderson", email: "bob@acme.com", isManager: true, password_hash: pw})
Repo.insert!(%User{name: "Carol Anderson", email: "carol@acme.com", isManager: false, password_hash: pw})
Repo.insert!(%User{name: "Dave Anderson", email: "dave@acme.com", isManager: false, password_hash: pw})

Repo.insert!(%Job{name: "Cyborg Arm", job_code: "VAOR-01", desc: "(1)", budget: 20.0})
Repo.insert!(%Job{name: "Sobriety Pill", job_code: "VAOR-02", desc: "(1)", budget: 45.0})
Repo.insert!(%Job{name: "Rat Cancer", job_code: "VAOR-03", desc: "(1)", budget: 12.0})
