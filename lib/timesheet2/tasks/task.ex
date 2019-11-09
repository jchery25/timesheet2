defmodule Timesheet2.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :job_code, :string
    field :note, :string
    field :number_of_hours, :decimal

    belongs_to :user, Timesheet2.Users.User #Specifically a worker
    # has_many :managers, Timesheet2.Users.Managers

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:job_code, :number_of_hours, :note, :user_id])
    |> validate_required([:job_code, :number_of_hours, :note, :user_id])
  end
end
