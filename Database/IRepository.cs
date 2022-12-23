using System.Linq.Expressions;

namespace DotNetCoreApp.Database
{
    public interface IRepository
    {
        bool SaveChanges();
        IEnumerable<T> GetAll<T>() where T : class;
        IEnumerable<T> GetAll<T>(Expression<Func<T, bool>> filters) where T : class;
        IEnumerable<T> GetAll<T>(Expression<Func<T, bool>> filters, params Expression<Func<T, object>>[] includeProperties) where T : class;
        IEnumerable<T> GetAll<T>(params Expression<Func<T, object>>[] includeProperties) where T : class;


        T Get<T>(Expression<Func<T, bool>> filters) where T : class;
        T Get<T>(Expression<Func<T, bool>> filters, params Expression<Func<T, object>>[] includeProperties) where T : class;

        void Add<T>(T entity) where T : class;
        void AddRange<T>(IEnumerable<T> entities) where T : class;

        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(IEnumerable<T> entity) where T : class;
    }
}
