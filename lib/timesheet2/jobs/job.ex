defmodule Timesheet2.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :decimal
    field :desc, :string
    field :job_code, :string
    field :name, :string
    field :user_id, :id

    # belongs_to :user, Timesheet2.Users.User
    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:job_code, :budget, :name, :desc])
    |> validate_required([:job_code, :budget, :name, :desc])
  end
end
