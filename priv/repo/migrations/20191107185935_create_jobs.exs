defmodule Timesheet2.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :job_code, :string, null: false
      add :budget, :decimal, null: false
      add :name, :string, null: false
      add :desc, :text, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: true

      timestamps()
    end

    create index(:jobs, [:user_id])
  end
end
