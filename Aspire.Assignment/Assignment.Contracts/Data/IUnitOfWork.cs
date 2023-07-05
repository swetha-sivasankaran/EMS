using Assignment.Contracts.Data.Repositories;

namespace Assignment.Contracts.Data
{
    public interface IUnitOfWork
    {
        IAppRepository App { get; }
        IUserRepository User { get; }
        IEmployeeRepository Employee { get;}
       IReferencetblRepository referencetbl{get;}

        Task CommitAsync();
    }
}