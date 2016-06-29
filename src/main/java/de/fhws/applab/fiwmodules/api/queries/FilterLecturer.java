package de.fhws.applab.fiwmodules.api.queries;

import de.fhws.applab.fiwmodules.models.Lecturer;
import de.fhws.applab.fiwmodules.models.LecturerFactory;
import de.fhws.applab.norbury.core.api.filter.AbstractFilter;
import de.fhws.applab.norbury.core.api.states.StateContext;
import de.fhws.applab.norbury.core.database.dao.results.CollectionModelDatabaseResult;

import java.util.List;

import static de.fhws.applab.norbury.core.api.states.Pager.page;

/**
 * Created by braunpet on 05.08.15.
 */
public class FilterLecturer extends AbstractFilter<Lecturer>
{
	protected String firstName;
	protected String lastName;

	public FilterLecturer( final String firstName, final String lastName )
	{
		this.firstName = firstName;
		this.lastName = lastName;
	}

	@Override public CollectionModelDatabaseResult executeDatabaseQuery( final StateContext... stateContexts )
	{
		final List<Lecturer> filteredResult = getResults( );
		final List<Lecturer> page = page( filteredResult, this.getOffset( ), this.getSize( ) );
		final CollectionModelDatabaseResult returnValue = new CollectionModelDatabaseResult( page );
		returnValue.setTotalNumberOfResult( filteredResult.size( ) );

		return returnValue;
	}

	protected List<Lecturer> getResults( )
	{
		final LecturerFactory lecturerFactory = LecturerFactory.getInstance( );
		return lecturerFactory.findByFirstNameAndLastName( this.firstName, this.lastName );
	}
}
